let $tree_menu = $('.tree-menu');
function createTree(num,onoff){

    //可以删
    if(onoff){
        $tree_menu.children().children().find('ul').remove();
    }
   

    //通过num找到对应的子级
    let ary = getChild(data,num);
    if(!ary.length)return;
    //只要有自己就创建一个ul，因为ul中要插入li
    let $ul = $('<ul style="padding-left:5px"></ul>');
    //循环子级数据，生成很多的li
    ary.forEach(item=>{
        let $li = $(`
            <li>
                <div class="tree-title tree-ico">
                    <span><i></i>${item.title}</span>
                </div>
            </li>
        `);

        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }

        $li.off().click(function(){
            if(this.children[0].classList.toggle('open')){
                $(this).append(createTree(item.id));
                render(item.id);
                createMenu(item.id);

            }else{
                $(this).find('ul').remove();
            }
           
            return false;
        });
        //再把li放到ul中
        $ul.append($li);
    }); 
    //返回当前创建的ul，里面有很多的li(文件夹)
    return  $ul;
}

$tree_menu.children().children().append( createTree(0) );



// $tree_menu.prepend($ul);

/*
 ${
                    createTree(ele.id) 
                }
*/
//0

