const path = require('path')
const nunjucks = require('nunjucks')
import {Ctx} from '../../interface'

interface Opts {
  env?: String,
  errorPageFolder: any
}

class MyHttpError {
  private filename: String | Number = 'other'
  private folder: any
  private opts: Opts
  constructor(opts: Opts) {
    this.opts = opts
    this.folder = this.opts.errorPageFolder
  }

  init () {
    return async (ctx: Ctx, next: any) => {
      try {
        await next()
      } catch (e) {
        console.log(e)
        this.handleError(ctx, e)
      }
    }
  }

  handleError (ctx: Ctx, e: any) {
    let status = parseInt(e.status)
    if (status >= 400) {
      switch (status) {
        case 400:
        case 404:
        case 500:
          this.filename = status
          break
        default:
          this.filename = 'other'
      }
    } else {
      status = 500
      this.filename = status
    }

    const filePath = this.folder ? path.join(this.folder, `${this.filename}.html`) : path.resolve(__dirname, './error.html')

    try {
      nunjucks.configure(this.folder ? this.folder : __dirname)
      const data = nunjucks.render(filePath, {
        status: e.status || e.message.NODE_ENV,
        error: e.message,
        stack: e.stack
      })
      ctx.status = status
      ctx.body = data
    } catch (err: any) {
      ctx.throw(500, `错误页面渲染失败:${err.message}`)
    }
  }
}

export default MyHttpError