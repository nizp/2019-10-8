const box = document.querySelector('.body');

const head = document.querySelector('.head');


function minIndex(ary){
    let min = Math.min(...ary);
    let index = ary.findIndex(item=>item === min);
    return {
        index,
        min
    }
}
//防抖
function debounce(cb,time){
    let timer;
    return function(...arg){
        //当事件触发的时候就先关闭上次的timer
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.call(this,...arg);
        }, time);
    }
}

//节流
function throttling(cb,time){
    let prevtime = 0,
    timer;
    return function(...arg){
        let nowTime = +new Date;
        // console.log(nowTime - prevtime)
        if(nowTime - prevtime > time){
            cb.call(this,...arg);
        }else{
            clearInterval(timer);
            timer = setTimeout(() => {
                // console.log(+new Date - prevtime);
                if(+new Date - prevtime > time){
                    cb.call(this,...arg);
                }
            }, time);
        }
        prevtime = nowTime;
    }
}

/*
    A:height B:clientHeight 
    C:innerHeight D:scrollHeight  
    E:offsetHeight F:lineHeight
*/

    const picw = 236; //图片的宽度
    const ml = 10; //margin-left
    const boxt = 66;
    let clientW = document.documentElement.clientWidth;//可视区的宽度

    let len = Math.floor(clientW / (picw+ml));

    //计算ul的宽度
    box.style.width = (len * (picw+ml)) - ml + 'px';
    // console.log(len)

    let aryx = [];//求x
    let aryy = [];//求y

    for(let i=0;i<len;i++){
        aryx[i] =  i * (picw+ml);
        aryy[i] = 0;
    }

function render(){
    fetch('../data.json')
    .then(d=>d.json())
    .then(ary=>{
        ary.forEach((item,i)=>{
            
            let {index} = minIndex(aryy);//找出数组中top最小的
            let li = document.createElement('li');
            //设置li的left，top
            li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;

            let div = document.createElement('div');
            div.className = 'img_box';
            let img = document.createElement('img');
            img.src = item.pic;

            
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.className = 'desc';
            p1.innerText = item.desc;
            p2.className = 'author';
            p2.innerText = item.author;
            div.append(img);
            div.append(p1);
            div.append(p2);
            li.append(div);
            box.append(li);
            setTimeout(() => {
                img.style.opacity = 1;   
            },200);

            //每次添加完一个li之后，把当前li的高度 + 间距 赋值到当前数组对应项中，以便于下次比较
            aryy[index] += (boxt + item.height*1 + 20); 
            // [100,0,0,0]
        });
    });
}
render();

//滚轮的时候判断触底
let iH = window.innerHeight; //可视区的高度
window.onscroll = debounce(fn,200);
// window.onscroll = throttling(fn,1000);
// window.onscroll = fn;
function fn(){
    //判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
    // if(box.scrollHeight < iH)return;
    let {index} = minIndex(aryy);  //最短的距离
    let scroll = window.pageYOffset; //滚动条的距离

    // console.log(iH + scroll);
    // console.log(aryy[index])
   
    if(iH + scroll >= aryy[index]){
        console.log('触底了');
        render();
    }

}

/*
    window.onresize   当浏览器窗口缩放的时候触发
*/
//当浏览器缩放的时候重新计算一下，可视区能放多少张图片
window.onresize = function(){
    // console.log(1);
    clientW = document.documentElement.clientWidth;//可视区的宽度
    len = Math.floor(clientW / (picw+ml));
    box.style.width = (len * (picw+ml)) - ml + 'px';
    aryx.length = 0;
    aryy.length = 0;
    iH = window.innerHeight;
    for(let i=0;i<len;i++){
        aryx[i] =  i * (picw+ml);
        aryy[i] = 0;
    }
    //获取所有的li，然后给重新安排位置
    const lis = box.querySelectorAll('li');
    lis.forEach((ele,i)=>{
        let {index} = minIndex(aryy);
        ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
        aryy[index] += (ele.scrollHeight + 10); 
    });

}