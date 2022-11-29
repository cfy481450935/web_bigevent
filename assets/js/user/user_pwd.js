layui.form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    rePwd:function(value){
        let newPwd = $(".layui-form [name='newPwd']" ).val()
        if(value!=newPwd){
            return "两次密码不一致"
        }
    },
    samePwd:function(value){
        let oldPwd = $(".layui-form [name='oldPwd']" ).val()
        if(value==oldPwd ){
            return "新旧密码不能相同"
        }
    }
})



$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:"post",
        url:"/my/updatepwd",
        data:$(this).serialize(),
        success:function(res){
            if (res.status !== 0){
                layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            $('.layui-form')[0].reset()

        }
    })
})