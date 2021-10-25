const koaRouter = require('koa-router')
const router = new koaRouter()
import HomeRouter from "./home"
import MySqlRouter from "./mysql"
class MainRouter {
  constructor (app: any) {
    this.init(app)
  }

  private init (app: any) {
    new HomeRouter(koaRouter, router)
    new MySqlRouter(koaRouter, router)
    app.use(router.routes()).use(router.allowedMethods())
  }
}

export default MainRouter