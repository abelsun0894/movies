const DB = require('../utils/db.js')

module.exports = {
  get: async ctx => {
    let data =await DB.query('select * from movies limit 15')
    ctx.state.data = data
  }
}