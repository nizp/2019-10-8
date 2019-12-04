/*
    new Swiper('#outer',{
        loop:true,  //true就无缝轮播，false就不无缝轮播
        autoplay:{ //也可以是个布尔值
            stopOnLastSlide:true   //到最后一张的时候关掉定时器
        },
        keyboard:true,   //可以使用键盘，左键和右键
        picAry:['./xx.jpg'],
        pagination:{ //分页器
            el:'#focus1',
            events:true
        },
        navigation:true    前进后退
    })

    {
        let temp = '';
        temp = d.map(item=>`<div><img src="${item.img}" alt=""></div>`).join('');
        temp += temp;
        const len = d.length * 2;
        swiper.innerHTML = temp;

       

        next.addEventListener('click',function(){
            num ++;
            loop();
        });
        prev.addEventListener('click',function(){
            num --;
            loop();
        });


        


        
    }


*/

class Swiper {
    constructor(el,{
        loop=false,
        autoplay=false,
        keyboard=false,
        picAry=[],
        pagination={
            events:false,
            el:null
        },
        navigation=false
    }) {
        this.box = document.querySelector(el);
        this.loop = loop;
        this.autoplay = autoplay;
        this.keyboard = keyboard;
        this.picAry = picAry;
        this.pagination = pagination;
        this.stopState = false;
        this.width = this.box.offsetWidth;
        this.num = 0;
        this.timer;
        this.len = 0;
        this.n = 0; 
        this.navigation = navigation;
        this.init();
    }

    init(){
        this.createSwiper();
        this.autoPlayFn();
        this.createPagination();
        if(this.navigation){ //有前进和后退按钮
            let that = this;
            this.createNavigation();
            this.next = this.mask.children[1];
            this.prev = this.mask.children[0];
            this.next.onclick = function(){
                that.num ++;
                if(that.loop){
                    that.loopFn(); //点击无缝轮播
                }else{
                    that.noLoop();
                }
                that.change();
            }
        }
    }

    //分页器
    createPagination(){
        let html = '';
        this.Pagination = document.querySelector(this.pagination.el);
        this.n = this.loop?this.len/2:this.len;
        for(let i=0;i<this.n;i++){
            html += `<li class="${i===0?'select':''}"></li>`;
        }

        // console.log(this.pagination.el)
        this.Pagination.innerHTML = html;
        this.dian = this.Pagination.children;

    }

    createSwiper(){
        this.SwiperDiv = document.createElement('div');
        this.SwiperDiv.id = 'swiper';
        if(this.loop){
            this.picAry = [...this.picAry,...this.picAry];
        }
        this.picAry.forEach(item=>{
            let img_box = document.createElement('div');
            img_box.innerHTML = `<img src="${item}" alt="">`;
            this.SwiperDiv.appendChild(img_box);
        });
        this.len = this.SwiperDiv.children.length;
        this.box.appendChild(this.SwiperDiv);
    }

    stop(){
        clearInterval(this.timer);
    }

    autoPlayFn(){
        //说明是个布尔值
        if(typeof this.autoplay === 'boolean'){
            if(this.autoplay){
                this.play();
            }
        }else if(typeof this.autoplay === 'object' && this.autoplay !== null){
            //如果stopOnLastSlide是个true，说明滚到最后一张就关闭定时器
            this.play();
            this.stopState = this.autoplay.stopOnLastSlide;
        }
    }

    play(){
        this.timer = setInterval(() => {
            this.num ++;
            if(this.loop){
                this.loopFn();
            }else{
                this.noLoop();
            }
            this.change();
        },1000);
    }

    //创建前进后退
    createNavigation(){
    
        this.mask = document.createElement('div');
        this.mask.id = 'mask';
        this.mask.innerHTML = `
            <div id="prev"></div>
            <div id="next"></div>
        `;
        this.box.insertBefore(this.mask,this.box.children[0]);

    }

    change(){

        if(this.dian){
            for(let i=0;i<this.dian.length;i++){
                this.dian[i].className = '';
            }
            this.dian[this.num%this.n].className = 'select';
        }

        move({
            el:this.SwiperDiv,
            attr:{
                left:- this.width * this.num
            },
            time:400,
            // fx:'elasticOut'
        });
    }

    noLoop(){
        if(this.num > this.len - 1){
            this.num = 0;
            if(this.stopState){
                this.stop();
            }
        }
        if(this.num < 0){
            this.num = this.len - 1;
        }
    }

    loopFn(){
        if(this.num > this.len-1){
            this.SwiperDiv.style.left = -this.width * (this.len/2-1) + 'px';
            this.num = this.len/2;
            if(this.stopState){
                this.stop();
                this.num = this.len/2-1;
            }
        }
        if(this.num < 0){
            this.SwiperDiv.style.left = -this.width * (this.len/2) + 'px';
            this.num = this.len/2-1;
        }
    }
}




