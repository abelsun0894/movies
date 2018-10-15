const DB = require('../utils/db.js')

module.exports = {
  post: async ctx => {
    let userInfo = ctx.state.$wxInfo.userinfo
    let comment_id = + ctx.request.body.commentId

    let data = await DB.query('insert into collection(open_id,comment_id) values(?,?)',[userInfo.openId,comment_id])

    ctx.state.data = data
  }
} 