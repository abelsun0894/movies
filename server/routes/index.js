/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//获取首页随机热门电影
router.get('/indexFilm',controllers.indexFilm.get),

//获取所有电影信息
router.get('/moviesInfo', controllers.moviesInfo.get),

//上传评论
router.post('/comment',validationMiddleware,controllers.comment.post),

//获取某个电影所有影评
router.get('/list',controllers.list.get),

//收藏影评
router.post('/collection',validationMiddleware,controllers.collection.post),

////获取收藏的影评或我的影评
router.get('/getComments/:collectionORmyComments',validationMiddleware,controllers.getComments.get)

//查询是否已经收藏过
router.get('/collection/:comment_id', validationMiddleware, controllers.collection.get),

//取消收藏
router.post('/cancelCollect/:comment_id',validationMiddleware,controllers.cancelCollect.post)

module.exports = router
