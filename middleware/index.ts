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
  private app: any
  constructor(app: any) {
    this.app = app
    this.init()
  }

  private init () {
    const MyHttpErrorIns = new MyHttpError({errorPageFolder: path.resolve(__dirname, "../errorPage")})
    const ErrorCatchIns = new ErrorCatch()
    const CorsRelatedIns = new CorsRelated()
    const MiSendIns = new MiSend()
    const MiLogIns = new MiLog()
    this.app.use(CorsRelatedIns.init())
    this.app.use(MyHttpErrorIns.init())
    this.app.use(ErrorCatchIns.init())
    this.app.use(MiSendIns.init())
    this.app.use((ctx: Ctx, next: any) => MiLogIns.init(ctx, next))
    this.app.use(views(path.resolve(__dirname, '../views')))
    this.app.use(bodyParser())
  }
}

export default Middleware