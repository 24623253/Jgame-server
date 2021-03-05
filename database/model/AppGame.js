/**
 * APP游戏列表
 */

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
const AppGames = sequelize.define(
  'app_game_copy1',
  {
    id: {
      type: Sequelize.STRING(50),
      defaultValue: uuid.v1(),
      primaryKey: true,
    },
    name: {
      // 定义类型 字符串
      type: Sequelize.STRING,
      // 是否允许为空 默认是 true
      // allowNull: true,
      // 约束不能为空
      // unique: true
    },
    title: {
      type: Sequelize.STRING,
    },
    titleId: {
      type: Sequelize.STRING(50),
      defaultValue: uuid.v1(),
    },
    // 标签
    tag: {
      type: Sequelize.STRING,
    },
    // 类型
    type: {
      // 定义类型 字符串
      type: Sequelize.STRING,
      // 是否允许为空 默认是 true
      // allowNull: true,
      // 约束不能为空
      // unique: true
    },
    typeId: {
      type: Sequelize.STRING(50),
      defaultValue: uuid.v1(),
    },
    // 图片
    img: {
      type: Sequelize.STRING,
    },
    // 轮播图
    swipers: {
      type: Sequelize.STRING,
    },
    // 大小
    size: {
      type: Sequelize.STRING,
    },
    // 排行
    ranking: {
      type: Sequelize.STRING(20),
    },
    // 是否网游
    online: {
      // TODO:type:Sequelize.NMUBER 报错，待解决
      type: Sequelize.STRING,
      defaultValue: 1,
    },
    // 热度
    heat: {
      type: Sequelize.STRING,
    },
    // 介绍
    introduce: {
      type: Sequelize.STRING,
    },
    // 更新信息、时间
    updateTime: {
      type: Sequelize.STRING,
    },
    // 版本
    versions: {
      type: Sequelize.STRING,
    },
    // 模拟器
    simulator: {
      type: Sequelize.STRING,
    },
    // 语言
    language: {
      type: Sequelize.STRING,
    },
    // 支持
    support: {
      type: Sequelize.STRING,
    },
    // 包名
    pname: {
      type: Sequelize.STRING(50),
    },
    // 下载链接
    href: {
      type: Sequelize.STRING(250),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)

// 同步模型
AppGames.sync().then(() => {
  console.log('模型同步成功->appGame')
})
// 导出
module.exports = { AppGames }
