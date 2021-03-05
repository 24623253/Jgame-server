const jwt = require('jsonwebtoken')
const request = require('request')

module.exports.mpWxAuth = async  (req, res) => {
    const {nickName} = req.body
    const token = jwt.sign({nickName},'lhw')
    const response = {
        data:token,
        code:'0',
        message:'微信授权登录成功'
    }
    res.status(200).send(response)
}

module.exports.mpWxAuthUserInfo = async  (req, res) => {
    const {access_token,openid} = req.body
    console.log(access_token,openid)
    // 请求微信第三方接口获取用户信息
    request("https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid,(error,WxResponse,body)=>{
        if (!error && WxResponse.statusCode == 200) {
            const userInfo = JSON.parse(body)
            const token = jwt.sign({nickName:userInfo.nickName},'lhw')
            console.log(userInfo) // 请求成功的处理逻辑，注意body是json字符串
            const response = {
                data:{
                    userInfo:userInfo,
                    token:token
                },
                code:'0',
                message:'微信授权登录成功'
            }
            res.status(200).send(response)
        }else{
            res.status(200).send({
                data:'授权失败',
                code:'201',
                message:"授权失败"
            })
        }
    })
    
}