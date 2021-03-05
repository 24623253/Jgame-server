const fs = require("fs");  // 引入fs模块

function writeFile(imgBase_64,nowDate,folder,imgType){
  return new Promise((resolve,reject)=>{
    const type = imgBase_64.name.split('.')[1]
    const path = './public/images/' + folder + nowDate + '.' + imgType;//路径从app.js级开始找--
    const base64 = imgBase_64.screenshot.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
		// const dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
		let dataBuffer = Buffer.from(base64,'base64')
    console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err,'<<<<<');
        }else{
          console.log('写入成功！<<<<');
          resolve('/images/appIcon/' + nowDate + '.' + imgType)
        }
    });
  })
    
}

module.exports = {
	writeFile
}