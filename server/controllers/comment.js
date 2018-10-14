const DB = require('../utils/db.js')

module.exports = {
  post: async ctx => {
    let data = ctx.request.body
    let movie_id = data.movieId
    let comment_type = data.commentType
    let comment = data.comment
    let open_id = ctx.state.$wxInfo.userinfo.openId
    let nickname = ctx.state.$wxInfo.userinfo.nickName
    let logo_url = ctx.state.$wxInfo.userinfo.avatarUrl
    let audio_url = data.recordCOSUrl
    let record_duration = + data.recordDuration

    //如是文字评论
    if(comment_type == 0){
      await DB.query('insert into comments(movie_id,open_id,nickname,logo_url,comment_type,words) values(?,?,?,?,?,?)', [movie_id, open_id, nickname, logo_url, comment_type, comment])
    }else if(comment_type == 1){
      //如果是音频评论
      await DB.query('insert into comments(movie_id,open_id,nickname,logo_url,comment_type,audio_url,record_duration) values(?,?,?,?,?,?,?)', [movie_id, open_id, nickname, logo_url, comment_type, audio_url, record_duration])
    }
    //ctx.state.data = ctx.state.$wxInfo
  }
}