const { Sequelize, sequelize } = require('../index')
const uuid = require('uuid')
/**
 * @说明
 * 用sequelize.define()定义Model时，传入名称~，默认的表名就是~s。
 * 第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。
 * 第三个参数是额外的配置，我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能。
 * 所有的ORM框架都有一种很不好的风气，总是自作聪明地加上所谓“自动化”的功能，但是会让人感到完全摸不着头脑。
 * 你可以使用 freezeTableName: true 参数停止 Sequelize 执行自动复数化.
 * 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改：
 */
const Swipers = sequelize.define(
  'swiper',
  {
	id: {
		type: Sequelize.STRING(50),
		defaultValue: uuid.v1(),
		primaryKey: true
	},
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    typeText: {
        type: Sequelize.STRING,
    },
    gameId: {
      type: Sequelize.STRING(50),
    },
    gameName: {
      type: Sequelize.STRING(50),
    },
    img: {
      type: Sequelize.STRING,
    },
  },
  {
		timestamps: false,
		freezeTableName: true
  }
)

// 同步模型
Swipers.sync().then(() => {
  console.log('模型同步成功->swiper')
})
// 导出
module.exports = { Swipers }
