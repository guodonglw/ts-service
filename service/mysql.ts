const MySqlDb = require('../models/index')
import {Ctx} from '../interface'

interface RequestAdd extends Ctx {
  id: Number
}

class MySqlService {
  private instance: any

  constructor() {
    const db = new MySqlDb().getDb()
    this.instance = db['gedan']
  }

  public create (params: Object) {
    return this.instance.create(params)
  }

  public async get(params: RequestAdd) {
    const res = await this.instance.findAll({
      where: {
        id: params.id
      }
    })
    return res
  }

  public async update (params: RequestAdd) {
    const res = await this.instance.update(params, {
      where: {
        id: params.id
      }
    })
    return res
  }

  public async delete (params: RequestAdd) {
    const res = await this.instance.destroy({
      where: {
        id: params.id
      }
    })
    return res
  }
}

module.exports = MySqlService