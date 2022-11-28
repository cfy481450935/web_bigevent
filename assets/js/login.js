$('.login-box a').click(function(){
    $('.login-box').hide()
    $('.reg-box').show()

})

$('.reg-box a').click(function(){
    $('.reg-box').hide()
    $('.login-box').show()

})

let form = layui.form
form.verify({
    
    pwd : [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
   
    repwd :function(value){
        console.log($('.reg-box [name = password]').val())
        if (value !== $('.reg-box [name = password]').val()){
            return "两次密码不一致"
        }
    }
   
})
let layer = layui.layer

$('#form_reg').on('submit',function(e){
    e.preventDefault()
    // return false
    $.ajax({
        type:"post",
        url:"/api/reguser",
        data:{username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()},
        success:function(res){
            if (res.status!=0){
                return layer.msg('提交失败'+res.message)
            }
            layer.msg('注册成功,请登录')
            $("#link_log").click()
        }

    })
})

$("#form_login").on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            if (res.status!=0){
                return layer.msg("登录失败"+res.message)
            }

            
            console.log(res.token)
            layer.msg("登录成功")
            localStorage.setItem('token',res.token)
            location.href ='./index.html'

        }
    })
})
