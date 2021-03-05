const { AppGames } = require('../../database/model/AppGame')
const { AppTitle } = require('../../database/model/AppTitle')
const { AppType } = require('../../database/model/AppType')
const uuid = require('uuid')
const fs = require("fs");  // 引入fs模块
const { Sequelize } = require('../../database/index');
const Op = Sequelize.Op
const { writeFile } = require('../../utils/writeFile');
// 列表

// 查
module.exports.list = async (req, res) => {
  if (req.query.id) {
    let list = await AppGames.findOne({
      where: { id: req.query.id },
    })

    list.swipers = JSON.parse(list.swipers)
    const response = {
      data: list,
      message: '查询成功',
      code: '0',
    }
    return res.status(200).send(response)
  }
  let size = Number(req.query.size || '10'),
  page = Number(req.query.page || '1')
  let { name, titleId, typeId } = req.query
  // 模糊搜索
  let filter = name ? { name: { [Op.like]: `%${name}%` } } : {}
  let titleIdFilter = titleId ? { titleId: titleId } : {}
  let typeIdFilter = typeId ? { typeId: typeId } : {}
  const list = await AppGames.findAll({
    where: {
      ...filter, ...titleIdFilter, ...typeIdFilter
    },
    limit: size, // 每页多少条
    offset: size * (page - 1), // 跳过多少条
  })
  
  const { count } = await AppGames.findAndCountAll({
    where: {
      ...filter, ...titleIdFilter, ...typeIdFilter
    },
    limit: size, 
    offset: size * (page - 1), 
  })
  
	
  list.filter((item) => {
		item.swipers = JSON.parse(item.swipers)
  })
  const response = {
    data: {
      records: list,
      current: page,
      page,
      size,
      total:count,
    },
    message: '查询成功',
    code: '0',
  }
  res.status(200).send(response)
}

// 添加
module.exports.add = async (req, res) => {
	
	const data = req.body
	const imgBase_64 = req.body.imgBase_64[0]
  const nowDate = Date.now()
  const temp = imgBase_64.name.split('.')
  // 过滤图片类型
  const imgType = temp.filter(item=>(item==='jpg') || (item==='png'))[0]
	if(data.imgBase_64.length){
		writeFile(imgBase_64,nowDate,'appIcon/',imgType)
  }
  
	data.img = '/images/appIcon/' + nowDate +'.' + imgType
  
  // 根据主题和类型ID寻找名称并存入
  const AppTitleItem =  await AppTitle.findOne({
    where: { id: req.body.titleId },
  })
  data.title = AppTitleItem.title
  const AppTypeItem =  await AppType.findOne({
    where: { id: req.body.typeId },
  })
  data.type = AppTypeItem.name

  
  // 写入轮播图片

  const swiperListBase_64 = req.body.swiperListBase_64

  console.log(swiperListBase_64.length,'<传入轮播图数组长度')

  const submitSwipers = Object.assign([],swiperListBase_64)

  if(submitSwipers.length){
    var nowDateArr = []
    
    submitSwipers.map((item,index)=>{
      nowDateArr.push('swiper' + index + Date.now())
      item.imgType = item.name.split('.').filter(item1=>(item1==='jpg') || (item1==='png'))
      console.log(item.imgType,'<<item.imgType')
      writeFile(item,nowDateArr[index],'swiper/',item.imgType[0])
    })
  }
  const swipersPathList = []
  if(nowDateArr){
    console.log(nowDateArr,'<<<now')
    nowDateArr.map((item,index)=>{
      submitSwipers.map((item1,index1)=>{
        if(index === index1) swipersPathList.push('/images/swiper/' + item + '.' + item1.imgType[0])
        console.log(item1.imgType,'<<item.imgType[0]')

      })
    })
  }
  console.log(swipersPathList.length,'<<<<<swipersPathList')
  console.log(swipersPathList.length,'<<<<<swipersPathList')

  data.swipers = JSON.stringify(swipersPathList)

  delete data.imgBase_64
  delete data.swiperListBase_64

  // 创建
	const createAppGames = await AppGames.create({ ...data,id:uuid.v1() })
  res.status(200).send({
    data: createAppGames,
    img:data.img,
    message: '增加成功！',
    code: '0',
  })
}

/**
 * 删除
 */
module.exports.del = async (req, res) => {
	const id = req.query.id
	await AppGames.destroy({where:{id:id}})//删除
	const response = {
		data:null,
		message:'删除成功',
		code:'0'
	}
	res.status(200).send(response)
}

// 修改
module.exports.update = async (req,res) => {
	const data = req.body
	const imgBase_64 = req.body.imgBase_64[0]
  const nowDate = Date.now()
  const AppGameItem = await AppGames.findOne({
    where: { id: req.body.id },
  })

  // 根据主题和类型ID寻找名称并存入
  const AppTitleItem =  await AppTitle.findOne({
    where: { id: req.body.titleId },
  })
  data.title = AppTitleItem.title
  const AppTypeItem =  await AppType.findOne({
    where: { id: req.body.typeId },
  })
  data.type = AppTypeItem.name

  const swiperListBase_64 = req.body.swiperListBase_64

  console.log(swiperListBase_64.length,'<传入轮播图数组长度')

  // console.log(imgBase_64)
  // 判断传入图片是否不变
    if(!(imgBase_64.screenshot.includes('/images/appIcon'))) {
      const temp = imgBase_64.name.split('.')
      // 过滤图片类型
      const imgType = temp.filter(item=>(item==='jpg') || (item==='png'))[0]
    // TODO:封装图片上传待优化
      writeFile(imgBase_64,nowDate,'appIcon/',imgType).then(res=>{
        console.log(res)
        // 上传图片成功后，删除该条数据原图片
        fs.unlink('./public' + AppGameItem.img, function(err) {
          if (err) {
              return console.error(err);
          }
          console.log("文件删除成功！");
        });
      })
      data.img = '/images/appIcon/' + nowDate + '.' + imgType
      console.log(data.img,'<<<<data.img')
    }else{
      delete data.img
    }

  // 写入轮播图片
  
  // 判断上传轮播图片是否存在重复
  var swiperLisHad = []
  // let AppGameItemArr = JSON.parse(AppGameItem.swipers)
  // console.log(AppGameItemArr,swiperListBase_64)
  // swiperLisHad.push(AppGameItemArr.findIndex(item => item.includes('images/swiper/swiper'))) 
  swiperListBase_64.map((item, index)=>{
    // TODO: 字符串截取待优化

    if(item.screenshot.includes('images/swiper/swiper')) swiperLisHad.push(item.screenshot.split('8008')[1]) 
  })
  console.log(swiperLisHad,'<<<<<swiperLisHad')

  const submitSwipers = Object.assign([],swiperListBase_64)
  submitSwipers.splice(0,swiperLisHad.length) // 去除原有轮播图
  // swiperListBase_64.length --> 传入轮播数组长度
  // submitSwipers.length --> 传入与原轮播图不一致的轮播数组长度,即更改的轮播数组
  console.log(swiperListBase_64.length,'<<传入轮播数组',submitSwipers.length ,'<<更改轮播数组')

  if(submitSwipers.length){
    var nowDateArr = []
    
    submitSwipers.map((item,index)=>{
      item.imgType = item.name.split('.').filter(item1=>(item1==='jpg') || (item1==='png'))

      nowDateArr.push('swiper' + index + Date.now())
      writeFile(item,nowDateArr[index],'swiper/',item.imgType[0])
      console.log(item.imgType[0],'<<<<<item.imgType[0]')
    })
  }
  const swipersPathList = []
  if(nowDateArr){
    console.log(nowDateArr,'<<<now')
    nowDateArr.map((item,index)=>{
      submitSwipers.map((item1,index1)=>{
        if(index === index1) swipersPathList.push('/images/swiper/' + item + '.' + item1.imgType[0])
      console.log(item1.imgType[0],'<<<<<item1.imgType[0]')

      })
    })
  }
  console.log(swipersPathList.length,'<<<<<swipersPathList')
  swipersPathList.push(...swiperLisHad)
  console.log(swipersPathList.length,'<<<<<swipersPathList')

  data.swipers = JSON.stringify(swipersPathList)

  delete data.imgBase_64
  delete data.swiperListBase_64
	await AppGames.update({ ...data },{where:{id:data.id}})
	const response = {
		data:data.swipers,
		code:'0',
		message:'修改成功'
	}
	res.status(200).send(response)
}





// uniapp 接口

// 查
module.exports.uniList = async (req, res) => {
  if (req.query.id) {
    let list = await AppGames.findOne({
      where: { id: req.query.id },
    })

    list.swipers = JSON.parse(list.swipers)
    const response = {
      data: list,
      message: '查询成功',
      code: '0',
    }
    return res.status(200).send(response)
  }
  
  let { name, typeId } = req.query
  // 模糊搜索
  let filter = name ? { name: { [Op.like]: `%${name}%` } } : {}
  let typeIdFilter = typeId ? { typeId: typeId } : {}

  const list = await AppGames.findAll({
    where: {
      ...filter,
      ...typeIdFilter
    },
  })

	
  list.filter((item) => {
		item.swipers = JSON.parse(item.swipers)
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