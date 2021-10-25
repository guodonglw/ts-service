class Gedan {
  constructor () {
    
  }

  init (sequelize: any, DataTypes: any) {
    const Gedan = sequelize.define('gedan', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      author: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      playCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      }
    }, {
      timestamps: false,
      freezeTableName: true
    })

    return Gedan
  }
}

module.exports = Gedan
