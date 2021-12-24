//每次调用$.get()或$.post()或$.ajax()的时候都会先调用ajaxPrefilter这个函数,在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url);

    //统一为有权限的接口添加headers请求头

    if( options.url.indexOf('/my/') !== -1){
        options.headers={
            Authorization:localStorage.getItem('token')||''
        }
        
    }
    options.complete = function(res){
        if(res.responseJSON.status === 1&& res.responseJSON.message === '身份认证失败！'){
            //强制清空token 
            localStorage.removeItem('token')
            // 强制跳转登录页面
             location.href = './login.html'
         }
    }
  
})