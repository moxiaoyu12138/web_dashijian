$(function(){
    //获取用户基本信息
    gitUserInfo()
//控制用户退出
    var layer = layui.layer
    $('#btnLogout').on('click',function(){

        layer.confirm('确定要退出吗？',{icon:3,title:'提示'}, function(index){
            //do something
          
            //清空本地token
            localStorage.removeItem('token')
            //重新跳转登录页面
            location.href='./login.html'
            //关闭confirm询问框
            layer.close(index);
          });       
    })
})

function gitUserInfo(){
 $.ajax({
     method:'GET',
     url:'/my/userinfo',
    //  headers:{
    //      Authorization:localStorage.getItem('token')||''
    //  },
     success:function(res){
      if(res.status !==0){
            // location.href='./login.html'
            return layui.layer.msg('获取用户基本信息失败!')
      }
      //调用renderAvatar渲染用户头像
      renderAvatar(res.data)
     },
    //  complete:function(res){
    //      if(res.responseJSON.status === 1&& res.responseJSON.message === '身份认证失败！'){
    //         //强制清空token 
    //         localStorage.removeItem('token')
    //         // 强制跳转登录页面
    //          location.href = './login.html'
    //      }
    //  }
 })
}
//渲染用户头像
function renderAvatar(user){
    // 获取用户名称
 var name =user.nickname || user.username
//设置欢迎文本
 $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
//  按需渲染用户头像
    if(user.user_pic !==null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()

    }
    else{
        //渲染文字头像

        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
