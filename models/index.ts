const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const basename = path.basename(module.filename)
const config = require('../config/config.json')[env]
console.log(config)
const sequelize = new Sequelize(config.database, config.username, config.password, config)

class  MysqlDb {
  protected db: any = {}

  constructor() {
    this.init()
  }

  private init () {
    fs.readdirSync(__dirname).filter((file:any) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts').forEach((file:any) => {
      const modelClass = require(path.join(__dirname, file))
      const model = new modelClass().init(sequelize, Sequelize.DataTypes)
      this.db[model.name] = model
    })
  }

  public getDb () {
    Object.keys(this.db).forEach(modelName => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db)
      }
    })

    this.db.sequelize = sequelize
    this.db.Sequelize = Sequelize

    return this.db
  }
}

module.exports = MysqlDb