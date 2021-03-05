const { User } = require('../../database/model/User')
// 导出
// TODO:
module.exports = async (req, res) => {
  // 查用户
	const user = await User.findOne({ where: { username:'admin' } })
 
  res.status(200).send({
    data: {
      name:user.name,
      authorities:[{authority: "ROLE_ADMIN"},{authority: "ROLE_Administrator"}],
      userInfo:user
    },
    code:'0',
    message:'成功'
  })
}
