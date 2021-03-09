/**
 * 
 */

const { AppTitle } = require('../../database/model/AppTitle')
const { Sequelize } = require('../../database/index');
const uuid = require('uuid')
const Op = Sequelize.Op

module.exports.list = async (req, res)=>{
  if(req.query.id){
		const data = await AppTitle.findOne({ where:{id:req.query.id} })
		const response = {
			data:data,
			code:'0',
			message:'查询成功'
		}
		return res.status(200).send(response)
	}
	
	let size = Number(req.query.size || '10'),
  page = Number(req.query.page || '1')
  const total = await AppTitle.findAndCountAll()
	let { title,titleId } = req.query
  // 模糊搜索
  let titleFilter = title ? { title: { [Op.like]: `%${title}%` } } : {}
  let titleIdFilter = titleId ? { id: titleId } : {}
  const list = await AppTitle.findAll({
    // where: { name:req.query.name },
		where: { 
			...titleFilter,
			...titleIdFilter
		},
		
    limit: size, // 每页多少条
		offset: size * (page - 1), // 跳过多少条
		order: [
			// 将转义 id 并针对有效方向列表进行降序排列
			['id', 'DESC'],
		]
	})
	
  const response = {
    data: {
      records: list,
      current: page,
      page,
      size,
      total: total.count,
    },
    message: '查询成功',
    code: '0',
  }
  res.status(200).send(response)
}

module.exports.allList = async (req, res)=>{
	
	const list = await AppTitle.findAll({})
	  
	const response = {
	  data: {
		records: list,
	  },
	  message: '查询成功',
	  code: '0',
	}
	res.status(200).send(response)
  }

// 添加
module.exports.add = async (req, res) => {
	
	const { title, remark } = req.body
	const model = await AppTitle.findAll({ where:{ title } })
	if(model.length){
		res.status(200).send({
			data: model,
			message: 'app主题已存在',
			code: '400',
		})
		return
	}

	// 插入数据
	const createAppTitle = await AppTitle.create({ title, remark, id:uuid.v1() }).catch((err)=> {
		console.log(err)
	});
  res.status(200).send({
    data: createAppTitle,
    message: '增加成功！',
    code: '0',
  })
}

// 修改
module.exports.update = async (req, res) => {
	
	const { id, title, remark } = req.body
	
	const createAppTitle = await AppTitle.update( { title, remark }, { where:{id} } )
  res.status(200).send({
    data: createAppTitle,
    message: '修改成功！',
    code: '0',
  })
}

// 删除
module.exports.del = async (req, res) => {
	const id = req.query.id
	await AppTitle.destroy({where:{id:id}})//删除
	const response = {
		data:null,
		message:'删除成功',
		code:'0'
	}
	res.status(200).send(response)
}
