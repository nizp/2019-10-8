const $fBox = $('#fBox');
const $kuang = $fBox.find('.kuang');
const {left:box_l,top:box_t} = $fBox.offset(); 

$fBox.on('mousedown',function(ev){
    let disX = ev.pageX,disY = ev.pageY,
    $folder = $folders.find('.file-item');

    /*
        在按下的时候，通过ev.target去判断，当前元素是不是文件夹，或者看看
        目标元素的父级是不是文件夹，如果是就不让框显示出来
    */
    if($(ev.target).closest('.file-item').length) return;
    // console.log($(ev.target).closest('.file-item')); 

    $kuang.show().css({
        left:disX - box_l,
        top:disY - box_t,
        border: '1px dashed #000'
    });

    

    $fBox.on('mousemove',function(ev){
        $kuang.css({
            //移动的减去按下的
            width:Math.abs(ev.pageX - disX),
            height:Math.abs(ev.pageY - disY),
            //鼠标移动的距离（基于可视区的） - fBox的距离
            left:Math.min(ev.pageX-box_l,disX-box_l),
            top:Math.min(ev.pageY-box_t,disY-box_t),
            
        });

        //move的时候看看，当前的框是否碰到了某几个元素
        $folder.each((i,ele)=>{
            if(bong($kuang[0],ele)){
                list.forEach((item)=>{
                    //数据的id和碰到的did去对比，如果相等就把item的值设置为true
                    if(item.id === $(ele).attr('did')*1){
                        item.checked = true;
                        $(ele).find('i').addClass('checked');
                        $(ele).addClass('active');
                    }
                });
            }else{
                list.forEach((item)=>{
                    if(item.id === $(ele).attr('did')*1){
                        item.checked = false;
                        $(ele).find('i').removeClass('checked');
                        $(ele).removeClass('active');
                    }
                });
            }

            //如果全选就勾上全选中，否则取消全选中。
            if(list.every(item=>item.checked)){
                $checkedAll.addClass('checked');
                every = true;
            }else{
                $checkedAll.removeClass('checked');
                every = false;
            }
         
        });

    });

    $(document).on('mouseup',function(ev){
        $fBox.off('mousemove');
        $(document).off('mouseup');
        $kuang.css({
            width:0,
            height:0,
            display:'none',
            border:'none',
            top:0,
            left:0
        });

        //returnVal 只要是returnVal为true（不需要阻止默认行为的时候，你就没必要画框）

        if(ev.pageX === disX && ev.pageY === disY && !returnVal){
            list.forEach(item => item.checked = false);
            $folder.each((i,ele)=>{
                $(ele).find('i').removeClass('checked');
                $(ele).removeClass('active');
            });
            every = false;
            $checkedAll.removeClass('checked');
        }

        // console.log(list);
    });

    // return false;
    // console.log(ev.originalEvent);
    ev.originalEvent.returnValue = returnVal;
});
