import {Ctx} from '../interface'

class Home {
  constructor() {
    
  }

  protected index (ctx: Ctx): void {
    ctx.log.info('111111111111111')
    ctx.response.body = '<h1>index page</h1>'
  }

  protected async login (ctx: Ctx) {
    await ctx.render('login')
  }
}


module.exports = Home