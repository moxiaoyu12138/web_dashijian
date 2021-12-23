//每次调用$.get()或$.post()或$.ajax()的时候都会先调用ajaxPrefilter这个函数,在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url);
})