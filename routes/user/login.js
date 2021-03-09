const { User } = require('../../database/model/User')
const jwt = require('jsonwebtoken')
module.exports.login = async (req, res) => {
  // 接收客户端传递过来的账号和密码
  const { username, password } = req.body
  // 根据用户名来查询数据库是否存在这个用户
  const findUser = await User.findOne({ where: { username } })
  // 判断
  if (!findUser) {
		const respoens = {
      data: null,
      message: '用户名不存在！',
      code: '400',
    }
		res.status(200).send(respoens)
    return
  }
  // 判断账号 和 密码 是否正确

  if (username != findUser.username || password != findUser.password) {
		const respoens = {
      data: null,
      message: '账号或密码不正确！',
      code: '400',
    }
		res.status(200).send(respoens)
    return
  }
  // 登陆成功生成 token 返回给客户端 第一个参数 是 组 ，第二个是 私钥（自己随便定义）
  const token = jwt.sign({ username }, 'lhw')
  res.status(200).send({
    data: {
      username: username,
      token,
    },
    code:'0',
    message:'成功'
  })
}



module.exports.uniLogin = async (req, res) => {
  // 接收客户端传递过来的账号和密码
  const { username, password } = req.body
  // 根据用户名来查询数据库是否存在这个用户
  const findUser = await User.findOne({ where: { username } })
  // 判断
  if (!findUser) {
		const respoens = {
      data: null,
      message: '用户名不存在！',
      code: '201',
    }
		res.status(200).send(respoens)
    return
  }
  // 判断账号 和 密码 是否正确

  if (username != findUser.username || password != findUser.password) {
		const respoens = {
      data: null,
      message: '账号或者密码不正确！',
      code: '201',
    }
		res.status(200).send(respoens)
    return
  }
  // 登陆成功生成 token 返回给客户端 第一个参数 是 组 ，第二个是 私钥（自己随便定义）
  const token = jwt.sign({ username }, 'lhw')
	const user = await User.findOne({ where: { username } })

  res.status(200).send({
    data: {
      username: username,
      userInfo:user,
      token,
    },
    code:'0',
    message:'成功'
  })
}
