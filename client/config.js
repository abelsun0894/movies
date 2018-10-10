/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://7l2rvt4d.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        //首页获取热门电影
        indexFilmUrl: `${host}/weapp/indexFilm`,

        //获取所有电影信息
        moviesInfoUrl: `${host}/weapp/moviesInfo`,

        //发布影评
        commentUrl: `${host}/weapp/comment`,

        //获取某个电影所有影评
        listUrl: `${host}/weapp/list`
    }
};

module.exports = config;
