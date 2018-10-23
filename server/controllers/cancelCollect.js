const DB = require('../utils/db.js')

module.exports = {
  post: async ctx => {
    let open_id = ctx.state.$wxInfo.userinfo.openId
    let comment_id = + ctx.params.comment_id

    let data = await DB.query('delete from collection where open_id = ? and comment_id = ?',[open_id, comment_id])

    ctx.state.data = data
  }
}