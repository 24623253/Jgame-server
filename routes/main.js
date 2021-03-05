const express = require('express')

const router = express.Router()

// 用户登录
// 后台端
router.post('/login', require('./user/login').login)
// uniapp端
router.post('/uni/login', require('./user/login').uniLogin)
// 添加用户
router.post('/register', require('./user/register'))

// 用户列表
router.get('/userlist', require('./user/userlist').list)
// 删除用户
router.delete('/user/del', require('./user/userlist').del)
// 修改用户
router.put('/user/update', require('./user/userlist').update)

// 授权auth
router.get('/auth/user', require('./permission/authUser'))

router.get('/auth/menu', require('./permission/menu'))


//** swiper */
router.get('/swiper/list', require('./swiper/index').list)
router.post('/swiper/add', require('./swiper/index').add)
router.put('/swiper/update', require('./swiper/index').update)
router.delete('/swiper/del', require('./swiper/index').del)

/**
 * app游戏列表接口->后台
 */
router.get('/app-game/list', require('./app-game/index').list)
// 增加
router.post('/app-game/add', require('./app-game/index').add)
// 修改
router.put('/app-game/update', require('./app-game/index').update)
// 删除
router.delete('/app-game/delete', require('./app-game/index').del)

/**
 * @uniapp
 * app游戏列表接口->后台
 */
// app&小程序 轮播图
router.get('/uni/swiper/list', require('./swiper/index').list)
// app&小程序 游戏列表
router.get('/uni/app-game/list', require('./app-game/index').uniList)
// app&小程序 游戏类型
router.get('/uni/app-type/list', require('./app-type/index').uniList)
// 我的游戏  TODO:
router.get('/user-game/list', require('./user-game/index').list)
// 小程序端微信授权登录获取token
router.post('/uni/wx-login/token', require('./uni-wx-auth/index').mpWxAuth)
// app端登录，接受前端access_token。openid，请求第三方接口，返回用户信息给前端
router.post('/uni/wx-login/mpWxGetAuthUserInfo', require('./uni-wx-auth/index').mpWxAuthUserInfo)


/**
 * app主题接口
*/
router.get('/app-title/list', require('./app-title/index').list)
router.get('/app-title/all-list', require('./app-title/index').allList)
router.post('/app-title/add', require('./app-title/index').add)
router.put('/app-title/update', require('./app-title/index').update)
router.delete('/app-title/delete', require('./app-title/index').del)

/**
 * app类型接口
*/
router.get('/app-type/list', require('./app-type/index').list)
router.get('/app-type/all-list', require('./app-type/index').allList)
router.post('/app-type/add', require('./app-type/index').add)
router.put('/app-type/update', require('./app-type/index').update)
router.delete('/app-type/delete', require('./app-type/index').del)


// 创建一个路由测试一下
router.get('/index', (req, res) => {
  res.send('访问成功！')
})

module.exports = router
