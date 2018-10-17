const DB = require('../utils/db.js')

module.exports = {
  get: async ctx => {
    let open_id = ctx.state.$wxInfo.userinfo.openId
    let collectionORmyComments = + ctx.params.collectionORmyComments
    let data

    if (collectionORmyComments === 1){
      //获取myComments
      data = await DB.query('select * from comments inner join movies on (comments.movie_id = movies.id) where comments.open_id = ? order by comments.time desc',[open_id])
    } else if (collectionORmyComments === 0){
      //获取collection
      data = await DB.query('select movies.id,movies.title,movies.image,comments.nickname,comments.logo_url,comment_type,comments.words,comments.audio_url,comments.record_duration from comments inner join collection on (comments.id = collection.comment_id) inner join movies on (comments.movie_id = movies.id) where collection.open_id = ? order by collection.time desc',[open_id] )
    }else{
      data = {}
    }
    ctx.state.data = data
  }
}