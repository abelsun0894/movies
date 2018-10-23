const DB = require('../utils/db.js')

module.exports = {
  post: async ctx => {
    let userInfo = ctx.state.$wxInfo.userinfo
    let comment_id = + ctx.request.body.commentId
    let data = await DB.query('insert into collection(open_id,comment_id) values(?,?)',[userInfo.openId,comment_id])

    ctx.state.data = data
  },

  get: async ctx => {
    let open_id = ctx.state.$wxInfo.userinfo.openId
    let comment_id = + ctx.params.comment_id

    let data = await DB.query('select count(*) from collection where open_id = ? and comment_id = ?',[open_id,comment_id])

    ctx.state.data = data
  },

} 