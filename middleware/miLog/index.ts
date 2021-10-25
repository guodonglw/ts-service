const log4js = require('log4js')
import { Ctx } from '../../interface'
import { appenders, baseInfo, contextLogger } from './interface'

class Logger {
  private contextLogger: contextLogger
  private baseInfo: baseInfo
  private appenders: appenders

  constructor () {
    this.baseInfo = {
      appLogLevel: "debug",
      dir: "logs",
      env: "dev",
      projectName: "node-demo",
      serverIp: "0.0.0.0"
    }
    this.appenders = {
      cheese: {
        type: 'dateFile',
        filename: `${this.baseInfo.dir}/task`,
        pattern:  '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      }
    }
    this.contextLogger = {
      debug: (msg) => {},
      info: (msg) => {},
      error: (msg) => {}
    }
  }

  async init (ctx: Ctx, next: any) {
    // 日志基础配置
    const config = {
      appenders: this.appenders,
      categories: {
        default: {
          appenders: Object.keys(this.appenders),
          level: this.baseInfo.appLogLevel
        }
      }
    }

    const logger = log4js.getLogger('cheese')
    log4js.configure(config)
    // 挂载方法
    this.contextLogger.debug = (message) => {
      logger.debug(this.access(ctx, message))
    }
    this.contextLogger.info = (message) => {
      logger.info(this.access(ctx, message))
    }
    this.contextLogger.error = (message) => {
      logger.error(this.access(ctx, message))
    }
    const start: any = new Date()
    ctx.log = this.contextLogger
    await next()
    const responseTime = Date.now() - start
    logger.info(`响应时间为${responseTime / 1000}s`)
  }

  access (ctx: Ctx, message: String) {
    const { method, url, host, headers } = ctx.request
    const client = {
      method,
      url,
      host,
      message,
      referer: headers['referer'],  // 请求的源地址
      userAgent: headers['user-agent']  // 客户端信息，设备及浏览器信息
    }

    return JSON.stringify(client)
  }
}

export default Logger