/** app类型模型 */
const { Sequelize, sequelize } = require('../index')
const uuid = require('uuid')

const AppType = sequelize.define('app_type', 
	{
		id:{
			type: Sequelize.STRING(50),
			defaultValue: uuid.v1(),
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING
		},
		remark:{
			type:Sequelize.STRING
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	}
)

AppType.sync().then(()=>{
	console.log('同步模型成功-->AppType')
}).catch(error=>{
	console.log('err->',error.message)
})


module.exports = { AppType }