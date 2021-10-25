import {Ctx} from '../interface'
const MySqlService = require('../service/mysql')
const service = new MySqlService()
import Decorator from '../decorator/index'

class MySqlController {

  constructor() {

  }

  @Decorator.beforeController
  protected async create (ctx: Ctx) {
    const { request } = ctx
    const params = request.body || {}
    const res = await service.create(params)
    ctx.body = {
      status: 0,
      data: res
    }
    
  }

  @Decorator.beforeController
  protected async get (ctx: Ctx) {
    const { request } = ctx
    const params = request.body || {}
    const res = await service.get(params)
    ctx.body = {
      status: 0,
      data: res
    }
  }

  @Decorator.beforeController
  protected async update (ctx: Ctx) {
    const { request } = ctx
    const params = request.body || {}
    const res = await service.update(params)
    ctx.body = {
      status: 0,
      data: res
    }
  }

  @Decorator.beforeController
  protected async delete (ctx: Ctx) {
    const { request } = ctx
    const params = request.body || {}
    const res = await service.delete(params)
    ctx.body = {
      status: 0,
      data: res
    }
  }
}

module.exports = MySqlController