import {Ctx} from '../../interface'

class MiSend {
  private set: any
  private body: any

  init () {
    return async (ctx: Ctx, next: any) => {
      ctx.send = this.render.bind(ctx)
      await next()
    }
  }

  render (json: Object) {
    this.set('Content-type', 'application/json')
    this.body = JSON.stringify(json)
  }
}

export default MiSend