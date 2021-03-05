const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'lhw123456', {
    host: 'localhost', // => 地址
    dialect: 'mysql', // => 指定数据库类型 必须指定
    port:'3306' // => 数据库端口 默认是 3306
})

// 链接数据库
sequelize.authenticate().then(()=>{
    console.log('数据库链接成功！')
}).catch(err=>{
    console.log('数据库链接失败',err)
})

module.exports = {Sequelize,sequelize}