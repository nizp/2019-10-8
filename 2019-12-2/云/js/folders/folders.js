const $folders = $('.folders'); //放文件夹的盒子
const $f_empty = $('.f-empty'); //显示隐藏空文件夹
const $checkedAll = $('#checkedAll');
function render(num=0){
    $folders.html('');
    let d = tools.getChild(data,num);
    list = d;//每次render的时候都把最新的当前需要显示的数据更新
    //没有length，就是没有子级
    if(!d.length){
        $f_empty.show();
        return;
    }
    $f_empty.hide();
    let every = true;
    $.each(d,(i,item)=>{
        //只要有一个数据的布尔值为false,就不可能全部选中，只要不是全部选中那么checkedAll就不能打钩
        if(!item.checked){
            every = false;
            $checkedAll.removeClass('checked');
        }
        const {checked,id,title} = item;
        let $folder = $(`<div class="file-item ${checked?'active':''}" did="${id}">
            <img src="img/folder-b.png" alt="" />
            <span class="folder-name">${title}</span>
            <input type="text" value="${title}" class="editor"/>
            <i class=${checked?"checked":''}></i>
        </div>`);

        let $img = $folder.find('img');
        let $i = $folder.find('i');

        $i.click(function(){
            data[id].checked = !data[id].checked;
            render(num);
        });


        $img.dblclick(function(){
            let id = $(this).parent().attr('did')*1;
            //只要双击进文件夹，先把当前对应数据的布尔值清掉
            d.forEach(item=>item.checked = false);
            $checkedAll.removeClass('checked'); //清掉全选
            render(id);
            createMenu(id); //为了联动面包屑
        });
       
        $folders.append($folder);
    });

    
    //点击全选的
    $checkedAll.off().click(function(){
        // console.log(every,d);
        d.forEach(item=>item.checked = !every);//先同步数据
        render(num);//再通过数据渲染页面
    });


    if(every){
        $checkedAll.addClass('checked');
    }

}
render(0);



//['微云','我的音乐','周杰伦','发如雪']