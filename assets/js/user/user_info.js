$(function(){
    let form = layui.form
    form.verify ={
        nickname:function(value){
            if(value.length>6)
                return '昵称长度必须在1~6个字之间'
        }
    }


    
})  

initUserInfo()



function initUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0)
                return layui.layer.msg('用户信息失败！')
            console.log(res)
            layui.form.val('formUserInfo',res.data)  
        }

    })      
}

$('#btnReset').click(function(e){
        e.preventDefault()
        initUserInfo()
     
})

$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:"post",
        url:"/my/userinfo",
        data: $(this).serialize(),
        success:function(res){
            console.log($(this).serialize())
            if(res.status!==0){
                return layui.layer.msg('更新用户信息失败!')
            }
            layui.layer.msg('更新用户信息成功!')
            // 调用父页面index
            window.parent.getUserInfo()
            console.log(window.parent)
        }

    })
})