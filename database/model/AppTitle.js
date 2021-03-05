/** app主题模型 */
const { Sequelize, sequelize } = require('../index')
const uuid = require('uuid')

const AppTitle = sequelize.define('app_title', 
	{
		id:{
			type: Sequelize.STRING(50),
			defaultValue: uuid.v1(),
			primaryKey: true
		},
		title:{
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

AppTitle.sync().then(()=>{
	console.log('同步模型成功-->AppTitle')
}).catch(error=>{
	console.log('err->',error.message)
})


module.exports = { AppTitle }