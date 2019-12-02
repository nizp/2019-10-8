const $del = $('#del');
const $rename = $('#rename');
//删除
$del.click(function(){
    //去判断至少要有一个文件被选中，如果都没被选中，说明找不到要删除的文件
    // console.log()
    if(list.some(item=>item.checked)){
        let {pid} = list[0]; //为了删除数据之后，重新渲染页面使用的
        list.forEach(item => {
            if(item.checked){
               delete data[item.id];
            }
        });
        render(pid);
        // console.log()

    }else{
        alert('请选择文件');
    }
});

//重命名
$rename.click(function(){
    let reData = list.filter(item=>item.checked); 

    

    if(list.some(item=>item.checked)){
        if(reData.length === 1){
            /*
                reData.title = val   (不能重名)
            */
           let $folder = $folders.find('.active');
           let $span = $folder.find('span');
           let $txt = $folder.find('input');
           $span.hide();
           $txt.css('display','block');
           $txt.select();
           $txt.blur(function(){
               //不能重名    
               /*
                    1.用户修改了吗？没有修改就不动，有就修改
                    2.有没有重名
               */
                let val = $txt.val();
                if($span.text() === val){
                    $span.show();
                    $txt.hide();
                }else{
                    if(!val){
                        console.log('请填写内容');
                        $txt.val($span.text());
                        $txt.select();
                        return;
                    }
                    let {id,pid} = reData[0];
                    let siblings = list.filter(item=>item.id != id);
                    if(siblings.some(item=>item.title === val)){
                        console.log('不好意思,你重名了');
                        $txt.select();
                    }else{
                        data[id].title = val;
                        data[id].checked = false;
                        render(pid);
                    }
                }


           });


        }else{
            alert('只能选择一个文件');
        }
       
    }else{
        alert('请选择文件');
    }
});




