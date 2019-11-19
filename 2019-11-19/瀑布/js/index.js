let oLis = document.querySelectorAll('.body li');
let box = document.getElementsByClassName('body')[0];
let oImgs = box.getElementsByTagName('img');
let flag = false;// 代表新数据渲染完成；什么时候 flag应该是个true;新数据一请求， 就把flag置为
let n = 0;// 记录加载新数据的次数；
// let oLis2 = box.getElementsByTagName('li');
// box.innerHTML += '<li>666</li>';
// console.log(oLis,oLis2)

function getData(){
    // 获取后台数据
    flag = true;
    n++;
    let xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && /200|304/.test(xhr.status)){
            // 请求成功；
            // console.log(xhr.response);
            let data = JSON.parse(xhr.response);
            render(data);//获取成功之后， 渲染数据
            flag = false; // 代表新数据渲染完成之后的操作
            loadAll();
        }
    }
    xhr.send();
}
getData();

// 渲染数据 
function render(ary){
    let str = '';
    ary.forEach((item,index)=>{
        let {desc,pic,height,author} = item;
        // str = `<div class="img_box">
        //     <img realSrc="${pic}" src='./img/1.jpg' alt="" style='height:${height}px'>
        //     <p class="desc">${desc}</p>
        //     <p class="author">${author}</p>
        // </div>`
        // // 挨个列的排放
        // // oLis[index%5].innerHTML += str;
        // let temp = getMinLi();// 找出了最低的li
        // //把要增加的这一项 放到最低的哪个li中；
        // temp.innerHTML += str;
        str = `
            <img realSrc="${pic}" src='./img/1.jpg' alt="" style='height:${height}px'>
            <p class="desc">${desc}</p>
            <p class="author">${author}</p>
            `
        let temp = getMinLi();// 找出了最低的li
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div)
    })
}

// 找最低的 li
function getMinLi(){
    // 能找出最短的哪个li
    let ary = [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}

// 滚动加载更多；
window.onscroll = function(){
    // if(n>=3)return;
    loadMore();
    loadAll();
}

function loadMore(){
    // 最短的哪个li露出底部的时候 去加载新数据
    let li = getMinLi();
    if(utils.offset(li).t+li.clientHeight <= document.documentElement.scrollTop+utils.winH().h){
        // 需要等新数据渲染到页面之后 再去加载新数据；
        if(!flag){
            console.log(666)
            getData();
        }
        
    }
}

function loadImg(ele){
    if(ele.myLoad)return;
    // 图片懒加载
    if(utils.offset(ele).t+ele.clientHeight/2 <= document.documentElement.scrollTop + utils.winH().h){
        //图片露出了一半；
        let realSrc = ele.getAttribute('realSrc');
        // ele.src = realSrc;
        let temp = new Image();
        temp.src = realSrc;// 让临时图片去请求真实的图片地址去了；
        temp.onload = function(){
            // 图片已经从远程拿到了本地；
            ele.src = realSrc;
            ele.myLoad = true;// 加载过之后的图片就不需要再去加载了；
            fadeIn(ele);
        }
        temp = null;

    }
}
function loadAll(){
    [...oImgs].forEach(item=>{
        loadImg(item);
    })
}

function fadeIn(ele){
    ele.style.opacity = 0;
    let n = 0;
    ele.timer = setInterval(()=>{
        n += 0.05;
        if(n >= 1){
            n = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = n;
    },10)
}