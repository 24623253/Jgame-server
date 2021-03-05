const jwt = require('jsonwebtoken')
const http = require('http')
const os = require('os');



// /**
//  * 获取当前机器的ip地址
//  */
function getIpAddress() {
  var ifaces=os.networkInterfaces()

  for (var dev in ifaces) {
    let iface = ifaces[dev]

    for (let i = 0; i < iface.length; i++) {
      let {family, address, internal} = iface[i]

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address
      }
    }
  }
}

let ipAddress = getIpAddress()
console.log(ipAddress,'123123123123123')

const express = require('express')
const app = express()
// 导出接收 post 请求数据 模块
const bodyParser = require('body-parser')
// 导入主路由
const mainRouter = require('./routes/main')
// 导入数据库连接
require('./database/index')
// 配置静态资源
const path = require('path'); 
app.use(express.static(path.join(__dirname,'public')))

const uuid = require('uuid');
const { request } = require('express');
console.log(uuid.v1())

// 设置跨域和相应数据格式
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  /*让options请求快速返回*/ else next()
})

app.get('/', (req, res) => {
  res.status(404).send({
    data: null,
    meta: {
      msg: 'Not Found',
      status: 404,
    },
  })
})

app.use('/api',(req,res,next)=>{
	console.log('进入->',req.url)
	if(req.url.includes('/login')||req.url.includes('/register')||req.url.includes('/uni')){
		next()
		return
	}

	// 接受客户端传 token
	const token = String(req.headers.authorization)
	// 解析 token 如果解析失败，返回 null
	const username = jwt.decode(token,'lhw')
  console.log(username,'<<<<<<<解析token')
	if(token == 'undefined' || username == null){
		res.status(401).send({
			data:null,
			messgae:'token过期',
			code:401
		})
		return
	}

	next() // 放行

})

// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
// 开放http请求最大参数修改---limit:'10mb'
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }));

// 为router 匹配 地址 /api
app.use('/api',mainRouter)


http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(80, () => {
  console.log('Server listening on: http://localhost:%s', 80)
})

app.listen(8008)
