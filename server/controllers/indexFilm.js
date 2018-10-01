const DB = require('../utils/db.js')

module.exports = {
  get: async ctx => {
    //获取随机电影信息
    let random = Math.random()
    let total = (await DB.query('select count(*) from movies'))[0]['count(*)']
    let numb = Math.ceil(random * total)
    let data1 = (await DB.query('select * from movies where id = ?',[numb]))[0]

    //获取此电影评论
    let data2 = await DB.query('select * from comments where movie_id = ? order by time desc limit 15',[numb])

    //合并结果
    ctx.state.data = [data1,data2]
  }
}