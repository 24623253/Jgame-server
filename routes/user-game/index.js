const { UserGame } = require('../../database/model/UserGame')
const { AppGames } = require('../../database/model/AppGame')

module.exports.list = async (req, res) => {
    const temAppGames = await AppGames.findAll()
    temAppGames.filter(item=>item.swipers = JSON.parse(item.swipers))
    const userId = req.query.userId
    const list = await UserGame.findAll({where:{userId}})
    const tempArr = []
    list.map((item)=>{
        tempArr.push(temAppGames.find(item1=> item1.id === item.gameId))
    })
    
    const response = {
        data:tempArr,
        code:'0',
        message:'查询成功'
    }
    res.status(200).send(response)
}