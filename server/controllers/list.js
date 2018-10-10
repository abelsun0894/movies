const DB = require('../utils/db.js')

module.exports = {
  get: async ctx => {
    let movie_id = + ctx.request.query.movieId
    let data = await DB.query('select * from comments where movie_id = ? order by time desc limit 15',[movie_id])
    ctx.state.data = data
  }
}