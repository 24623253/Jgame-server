const { Sequelize, sequelize } = require('../index')
const uuid = require('uuid')

const UserGame = sequelize.define(
  'user_game',
  {
		id: {
			type: Sequelize.STRING(50),
			defaultValue: uuid.v1(),
			primaryKey: true
		},
    userId: {
			type: Sequelize.STRING(50),
		},
		gameId: {
			type: Sequelize.STRING(50),
		},
		userName:{
			type: Sequelize.STRING,
		},
		gameName:{
			type: Sequelize.STRING,
		}
  },
  {
		timestamps: false,
		freezeTableName: true
  }
)

// 同步模型
UserGame.sync().then(() => {
  console.log('模型同步成功->UserGame')
})
// 导出
module.exports = { UserGame }
