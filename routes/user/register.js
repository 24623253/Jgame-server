const { User } = require('../../database/model/User')
const uuid = require('uuid')
// 导出
module.exports = async (req, res) => {
  // 接收客户端 传递过来的 信息
	const { name, username, password } = req.body
  // 根据客户端传递过来的 用户名 查询 数据库 中 是否 存在这用户名
	const model = await User.findAll({ where: { username } })
  // 判断
  if (model.length) {
    res.status(200).send({	
      data: null,
      meta: {
        msg: '用户名已经存在！',
        code: '400',
      },
    })
    return
  }
  // 创建用户
  const createUser = await User.create({ id:uuid.v1() ,username, password, name })
  res.status(200).send({
    data: {
      createUser,
    },
      message: '创建成功！',
      code: '0',
  })
}
