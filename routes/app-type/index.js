/**
 * 
 */

const { AppType } = require('../../database/model/AppType')
const { Sequelize } = require('../../database/index');
const uuid = require('uuid')
const Op = Sequelize.Op

module.exports.list = async (req, res)=>{
  if(req.query.id){
		const data = await AppType.findOne({ where:{id:req.query.id} })
		const response = {
			data:data,
			code:'0',
			message:'查询成功'
		}
		return res.status(200).send(response)
	}
	
	let size = Number(req.query.size || '10'),
  page = Number(req.query.page || '1')
  const total = await AppType.findAndCountAll()
	let { name,typeId } = req.query
  // 模糊搜索
  let nameFilter = name ? { name: { [Op.like]: `%${name}%` } } : {}
  let typeIdFilter = typeId ? { id: typeId } : {}
  const list = await AppType.findAll({
    // where: { name:req.query.name },
		where: { 
			...nameFilter,
			...typeIdFilter
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
	const list = await AppType.findAll({})
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
	
	const { name, remark } = req.body
	const model = await AppType.findAll({ where:{ name } })
	if(model.length){
		res.status(200).send({
			data: model,
			message: 'app主题已存在',
			code: '400',
		})
		return
	}

	// 插入数据
	const createAppType = await AppType.create({ name, remark, id:uuid.v1() }).catch((err)=> {
		console.log(err)
	});
	console.log(name,remark)
	res.status(200).send({
		data: createAppType,
		message: '增加成功！',
		code: '0',
	})
}

// 修改
module.exports.update = async (req, res) => {
	
	const { id, name, remark } = req.body
	
	const createAppType = await AppType.update( { name, remark }, { where:{id} } )
  res.status(200).send({
    data: createAppType,
    message: '修改成功！',
    code: '0',
  })
}

// 删除
module.exports.del = async (req, res) => {
	const id = req.query.id
	await AppType.destroy({where:{id:id}})//删除
	const response = {
		data:null,
		message:'删除成功',
		code:'0'
	}
	res.status(200).send(response)
}




// uniapp 接口
module.exports.uniList = async (req, res)=>{
	if(req.query.id){
		  const data = await AppType.findOne({ where:{id:req.query.id} })
		  const response = {
			  data:data,
			  code:'0',
			  message:'查询成功'
		  }
		  return res.status(200).send(response)
	  }
	  
	  
	const list = await AppType.findAll({
		order: [Sequelize.literal('rand()')]
	})
	  
	const response = {
	  data: {
		records: list,
	  },
	  message: '查询成功',
	  code: '0',
	}
	res.status(200).send(response)
  }
