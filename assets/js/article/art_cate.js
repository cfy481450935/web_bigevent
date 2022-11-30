$(function(){
    initArtCateList()
    function initArtCateList(){
        $.ajax({
           
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('数据获取失败')
                }
                let htmlStr= template('tpl-table',res)
                $('tbody').html(htmlStr)
               

            }
        })
    }
    let indexAdd =null

    $('#btnAddCate').click(function(){
        indexAdd=layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文件类别',
            content: $('#diaolog-add').html()
        })


    })

    $('body').on('submit','#form-add' ,function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('新增分类失败')
                }
                initArtCateList()
                layui.layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    $('tbody').on('click','#btn-edit',function(){
        indexEdit=layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文件类别',
            content: $('#diaolog-edit').html()
        })
        let id = $(this).attr('data-id')
        console.log(id)
        $.ajax({
            method:'get',
            url:"/my/article/cates/"+id,
            success:function(res){
                if(res.status !== 0 ){
                    return layui.layer.msg('分类数据获取失败')
                }
                layui.form.val('form-edit',res.data)
            }
        })
  
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status !== 0 ){
                    return layui.layer.msg('更新分类数据失败！')
                }
                layui.layer.msg('更新分类数据成功！')
                
                layui.layer.close(indexEdit)
                initArtCateList()   
            }
        })
        
    })

    $('tbody').on('click','#btn-del',function(){
           let id = $(this).attr('data-id')
        
           layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
                $.ajax({
                    method:'get',
                    url:'/my/article/deletecate/'+id,
                    success:function(res){
                        console.log(res)
                        if(res.status!==0){
                            return layui.layer.msg('删除分类失败！')
                        }
                        layui.layer.msg('删除分类成功！')
                        layui.layer.close(index)
                        initArtCateList()
                    }

                })
            
           
          });

    })



})