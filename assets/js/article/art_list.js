$(function(){
    let q= { 
        pagenum:1,
        pagesize:2,
        cate_id :'',
        state:''
    }
    let laypage = layui.laypage
    initTable()
    initCate()
    

    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !==0 ){
                    return layui.layer.msg('获取文章列表失败！')
                }
                // layui.layer.msg('获取文章列表成功！')
                
                let htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
               
                renderPage(res.total)
            }
        })
    }

    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date)

        let y =dt.getFullYear()
        let m =paddingZero(dt.getMonth()+1)
        let d = paddingZero(dt.getDate())
        let hh = paddingZero(dt.getHours())
        let mm =paddingZero(dt.getMinutes())
        let ss = paddingZero(dt.getSeconds())

        return  y+'-'+ m + '-' + d+' '+hh+':'+mm+':'+ss
        
    }

    function paddingZero(n){
        return n > 9 ? n : '0' + n
    }


    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('获取分类数据失败！')
                }
            let htmlStr = template('tpl-cates' ,res)
            $('[name = cate_id]').html(htmlStr)
            // console.log($('[name = cata_id]').html())
            layui.form.render()
            }

        })
    }
    $("#form-search").on('submit',function(e){
    
        e.preventDefault()
       let cate_id = $('[name = cate_id]').val()
       let state = $('[name = state]').val()
        
     
       q.cate_id = cate_id
       q.state = state
       console.log(q)
       initTable()
       
    })

    function renderPage(total){
        layui.use('laypage', function(){
            
            
            //执行一个laypage实例
            laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,count: total //数据总数，从服务端得到
                ,limit:q.pagesize
                ,curr:q.pagenum 
                ,layout:['count','limit','prev', 'page', 'next','skip']
                ,limits:[2,3,5,10]
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    q.pagenum = obj.curr
                    q.pagesize=obj.limit
                    //首次不执行
                    if(!first){
                        initTable()
                    }
                  }
            })
            })
    }

    $('tbody').on('click','.btn-delete',function(){
            let len = $('.btn-delete').length
            console.log(len)
            let id = $(this).attr('data-id')
            console.log(id)
            layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
                //do something
                $.ajax({
                    method:'GET',
                    url:'/my/article/delete/'+id,
                    success:function(res){
                        if(res.status!=0){
                            return layui.layer.msg("删除文章失败")
                            
                        }
                        if(len == 1){
                            
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum -1 
                            
                        }
                        initTable()
                    }
                })
                  
                layer.close(index);
              })
            
    })

    // $('tbody').on('click','.btn-edit',function(){
    //     console.log(11)
    //     location.href= '/article/art_pub.html'
    // })
})






