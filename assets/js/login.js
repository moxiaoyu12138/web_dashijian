$(function(){
    //点击去登录的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去注册的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //  通过form.verify()函数自定义校验规则
  form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd:function(value){
      var pwd =  $('.reg-box [name=password]').val()
      if(pwd !== value){
        return '两次密码不一致'
      }
    }
  })
  //监听注册表单提交事件
  $('#form_reg').on('click',function(e){
    //阻止默认提交行为
    e.preventDefault()
    // 发起ajax请求
    var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=repassword]').val()}
    $.post('/api/reguser',data,function(res){
      if(res.status !==0){
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      //点击去登陆按钮
      $('#link_login').click()
    })
  })
  //监听登录表单提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功')
        // console.log(res.token);
        //将登录成功得到的token字符串保存到localStorage中
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })
  })
  
})