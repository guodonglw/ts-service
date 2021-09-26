const koaRouter = require('koa-router')
const router = new koaRouter()
import HomeRouter from "./home"

class MainRouter {
  protected app: any
  constructor (app: any) {
    this.app = app
    this.init()
  }

  private init () {
    new HomeRouter(koaRouter, router)
    this.app.use(router.routes()).use(router.allowedMethods())
  }
}

export default MainRouter