# Jgame-server
====

## Jgame后台服务接口

+ 项目内版本号：1.0.0
+ 后台管理线上地址： http://101.133.171.109/
+ 环境： node.js v10.8.0  MySQL v8.0
+ 后台管理： [Jgame-management-web](https://github.com/24623253/Jgame-management-web) 
+ uniapp（Android端&小程序端）： [Jgame-uniapp](https://github.com/24623253/Jgame-uniapp) 


## Build Setup

项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/24623253/Jgame-server.git
```

- 环境
```
node.js v10.8.0   
MySQL v8.0
```

- 安装依赖
```
npm install
cnpm install
```

- 开发模式运行
```
nodemon app
```

## TODO: 接口文档

wait...

### 技术
#####  ORM框架 [Sequelize](https://www.sequelize.com.cn/) 
#####  Node.js 
#####  MySQL 
#####  等等。。。  

## 项目结构梳理

```
_ 
├── database/··················<- 
│   ├── modele/·······················<- 数据库映射
│   ├── index.js/·····················<- 数据库连接配置

├── node_modules/··············<- 依赖的node工具包目录
├── public/····················<- 
│   ├── appIcon/······················<- app图标
│   ├── fightGame/····················<- 对战图片
│   ├── head/·························<- 头像
│   ├── swiper/·······················<- 轮播图片
├── router/····················<- 路由接口文件
│   ├── app-game/·····················<- app 游戏数据处理
│   ├── app-title/····················<- app 主题数据处理
│   ├── app-type/·····················<- app 游戏类型处理
│   ├── permissison/··················<- 权限 数据处理
│   ├── swiper/·······················<- 轮播图片数据处理
│   ├── uni-wx-auth/··················<- 微信授权数据处理
│   ├── user/·························<- 用户数据处理
│   ├── user-game/····················<- 用户游戏数据处理
│   ├── main.js·······················<- 接口入口路径js
├── utils/······················<- 公共方法
├── app.js······················<- app入口文件
├── package-lock.json
├── package.json
├── README.md

```

## 时间线

### 2021-3-5 项目初始化

+ 项目内版本号：1.0.0
