let style = localStorage.getItem('style');
if(!style){
    fetch('./index.css').then(e=>e.text()).then(d=>{
       let link = document.createElement('style');
       link.innerHTML = d;
       document.querySelector('head').append(link);
       localStorage.setItem('style',d);
    })
}else{
 
    let link = document.createElement('style');
    link.innerHTML = style;
    document.querySelector('head').append(link);
}
console.log(style)





const lis = document.querySelectorAll('#ul1 li');
//一刷新取本地的数据
let ary = JSON.parse(localStorage.getItem('gwc')) || [];
render(ary);//拿到本地数据刷新购物车


//添加购物车
lis.forEach((ele,i)=>{
    ele.onclick = function(){
        console.log(this.innerText);
        if(!ary.includes(this.innerText)){
            ary.push(this.innerText);
            localStorage.setItem('gwc',JSON.stringify(ary));//设置本地存储的时候，会默认转字符串
            // console.log(localStorage.getItem('gwc'))
            render(ary);
        }
    }
});

//只要是修改了localStorage值，兄弟页面就会触发这个事件
window.onstorage = function(){
    ary = JSON.parse(localStorage.getItem('gwc')) || [];
    render(ary);
}

//删除购物车
ul2.onclick = function(ev){
    if(ev.target.tagName === 'LI'){
        ary = ary.filter(item=>item !== ev.target.innerText);
        render(ary);
        localStorage.setItem('gwc',JSON.stringify(ary));
    }
}

function render(ary){
    let html = ary.map(item=>`<li>${item}</li>`).join('');
    ul2.innerHTML = html;
}