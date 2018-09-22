const DB = require('../utils/db.js')

module.exports = {
  get: async ctx => {
    let random = Math.random()
    let total = (await DB.query('select count(*) from movies'))[0]['count(*)']
    let numb = Math.ceil(random * total)
    let data = (await DB.query('select * from movies where id = ?',[numb]))[0]
    ctx.state.data = data
  }
}