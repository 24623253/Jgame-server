const { Swipers } = require('../../database/model/Swiper')
const uuid = require('uuid')
const fs = require("fs");  // 引入fs模块
const { Sequelize } = require('../../database/index');
const Op = Sequelize.Op
const { writeFile } = require('../../utils/writeFile');

// 列表
module.exports.list = async (req, res) => {
	if(req.query.id){
		const list = await Swipers.findOne({
			where:{id:req.query.id},
			
		})
		const response = {
			data:list,
			message:'查询成功',
			code:'0'
		}
		return res.status(200).send(response)
	}
	let size = Number(req.query.size||'10'), page = Number(req.query.page||'1');
	const total = await Swipers.findAndCountAll();
	
	const list = await Swipers.findAll({
		limit: size, // 每页多少条
		offset: size * (page - 1) // 跳过多少条
	})
	const response = {
		data:{
			records:list,
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

// 添加
module.exports.add = async (req,res)=>{
	const data = req.body
	const imgBase_64 = req.body.imgBase_64[0]
  const nowDate = Date.now()
  const temp = imgBase_64.name.split('.')
  // 过滤图片类型
  const imgType = temp.filter(item=>(item==='jpg') || (item==='png'))[0]
	if(data.imgBase_64.length){
		writeFile(imgBase_64,nowDate,'swiper/',imgType)
  }
  
	data.img = '/images/swiper/' + nowDate +'.' + imgType
  

  delete data.imgBase_64

  // 创建
	const createSwipers = await Swipers.create({ ...data,id:uuid.v1() })
  res.status(200).send({
    data: createSwipers,
    img:data.img,
    message: '增加成功！',
    code: '0',
  })
}

// 修改
module.exports.update = async (req,res)=>{
	const data = req.body
	const imgBase_64 = req.body.imgBase_64[0]
	const nowDate = Date.now()
	const swiperItem = await Swipers.findOne({
		// 查上一张图片，以便在修改时删除上一张图片
    where: { id: req.body.id },
  })
  // 判断传入图片是否不变
	if(!(imgBase_64.screenshot.includes('/images/swiper'))) {
		const temp = imgBase_64.name.split('.')
		// 过滤图片类型
		const imgType = temp.filter(item=>(item==='jpg') || (item==='png'))[0]
	// TODO:封装图片上传待优化
		writeFile(imgBase_64,nowDate,'swiper/',imgType).then(res=>{
			console.log(res)
			// 上传图片成功后，删除该条数据原图片
			fs.unlink('./public' + swiperItem.img, function(err) {
				if (err) {
					return console.error(err);
				}
				console.log("文件删除成功！");
			});
		})
		data.img = '/images/swiper/' + nowDate + '.' + imgType
	}else{
		delete data.img
	}

  const updateSwipers = await Swipers.update({ ...data },{where:{id:data.id}})
  res.status(200).send({
    data: updateSwipers,
    img:data.img,
    message: '增加成功！',
    code: '0',
  })
}

// 删除
module.exports.del = async (req, res) => {
	const id = req.query.id
	await Swipers.destroy({where:{id:id}})//删除
	const response = {
		data:null,
		message:'删除成功',
		code:'0'
	}
	res.status(200).send(response)
}

