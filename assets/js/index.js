;(function(){
    getUserInfo()
    $('#exit').click(function(){
        layui.layer.confirm('确认退出登录?',{icon: 3, title:'提示'}, function(index){
            location.href='login.html'
            localStorage.removeItem('token')
            
            layer.close(index);
          })
    })



})()


function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
       
        success:function(res){
            
            if(res.status !== 0){
                return layui.layer.msg("获取用户信息失败")}
            readerAvatar(res.data)
        } 
    })
}

function readerAvatar(user){
    
    let name = user.nickname || user.username

    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-avatar').html(user.username[0].toUpperCase()).show()
    }

}

