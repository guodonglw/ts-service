const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const path = require('path')
import MyHttpError from "./httpError"
import ErrorCatch from './errorCatch'
import CorsRelated from './corsRelated'
import MiSend from './miSend'
import MiLog from './miLog'
import { Ctx } from '../interface'

class Middleware {
  constructor(app: any) {
    this.init(app)
  }

  private init (app: any) {
    const MyHttpErrorIns = new MyHttpError({errorPageFolder: path.resolve(__dirname, "../errorPage")})
    const ErrorCatchIns = new ErrorCatch()
    const CorsRelatedIns = new CorsRelated()
    const MiSendIns = new MiSend()
    const MiLogIns = new MiLog()
    app.use((ctx: Ctx, next: any) => MiLogIns.init(ctx, next))
    app.use(CorsRelatedIns.init())
    app.use(MyHttpErrorIns.init())
    app.use(ErrorCatchIns.init())
    app.use(MiSendIns.init())
    app.use(views(path.resolve(__dirname, '../views')))
    app.use(new bodyParser())
  }
}

export default Middleware