const DB = require('../utils/db.js')

module.exports = {
  post: async ctx => {
    let data = ctx.request.body
    let movie_id = data.movieId
    let comment_type = data.commentType
    let comment = data.comment
    let open_id = data.userInfo.openId
    let nickname = data.userInfo.nickname
    let logo_url = data.userInfo.logoUrl
    let audio_url = data.recordCOSUrl

    //如是文字评论
    if(comment_type == 0){
      await DB.query('insert into comments(movie_id,open_id,nickname,logo_url,comment_type,words) values(?,?,?,?,?,?)', [movie_id, open_id, nickname, logo_url, comment_type, comment])
    }else if(comment_type == 1){
      //如果是音频评论
      await DB.query('insert into comments(movie_id,open_id,nickname,logo_url,comment_type,audio_url', [movie_id, open_id, nickname, logo_url, comment_type,audio_url])
    }

  }
}