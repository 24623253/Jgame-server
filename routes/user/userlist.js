const { response } = require('express')
const { User } = require('../../database/model/User')

// 列表
module.exports.list = async (req, res) => {
	if(req.query.id){
		const userdata = await User.findOne({
			where:{id:req.query.id},
			
		})
		const response = {
			data:userdata,
			message:'查询成功',
			code:'0'
		}
		return res.status(200).send(response)
	}
	let size = Number(req.query.size), page = Number(req.query.page);
	const total = await User.findAndCountAll();
	
	const userlist = await User.findAll({
		limit: size, // 每页多少条
		offset: size * (page - 1) // 跳过多少条
	})
	const response = {
		data:{
			records:userlist,
			current: page,
			page,
			size,
			total:total.count
		},
		message:'查询成功',
		code:'0'
	}
	res.status(200).send(response)
}

// 删除
module.exports.del = async (req, res) => {
	const id = req.query.id
	await User.destroy({where:{id:id}})//删除
	const response = {
		data:null,
		message:'删除成功',
		code:'0'
	}
	res.status(200).send(response)
}

// 修改
module.exports.update = async (req,res) => {
	const {password,name,id} = req.body
	
	await User.update({ password,name },{where:{id:id}})
	const response = {
		data:null,
		code:'0',
		message:'修改成功'
	}
	res.status(200).send(response)
}
