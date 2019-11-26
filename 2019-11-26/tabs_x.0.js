
class Tab {
    constructor(that) {
        this.box = that; //jquery对象
        this.opts = {
            btns:['按钮一','按钮二','按钮三'],
            content:[
                '1111',
                '222',
                '3333'
            ]
        }
        // console.log(this.box);
    }
    init(opts){
        $.extend(true,this.opts,opts)
        this.createBtn();
        this.createDiv();
        this.events();
    }
    createBtn(){
        this.opts.btns.forEach((item,i)=>{
            this.box.append($(`<button class="${i==0?'active':''}">${item}</button>`))
        });
    }
    createDiv(){
        this.opts.content.forEach((item,i)=>{
            this.box.append($(`<div class="${i==0?'show':''}">${item}</div>`))
        });
    }
    events(){
        this.btns = this.box.find('button');
        this.divs = this.box.find('div');

        let that = this;

        this.btns.click(function(){
            $(this).addClass('active').siblings('button').removeClass('active');
           
            that.divs.eq($(this).index('button')).addClass('show').siblings('div').removeClass('show');
        });
    }

}



class Drag {
    constructor(that) {
        this.box = that;
        this.disX = 0;
        this.disY = 0;
    }
    position(){
        this.box.css({
            position:'absolute',
            top:0,
            left:0
        })
    }
    mousedown(){
        let that = this;
        this.box.mousedown(function(ev){
            that.disX = ev.pageX - $(this).offset().left;
            that.disY = ev.pageY - $(this).offset().top;
            that.mousemove();
            that.mouseup();

            return false;
        });
    }
    mousemove(){
        let that = this;
        $(document).mousemove(function(ev){
            that.box.css({
                top:ev.pageY - that.disY,
                left:ev.pageX - that.disX
            })
        });
    }
    mouseup(){
        $(document).mouseup(function(ev){
            $(this).off('mousemove');
            $(this).off('mouseup');
        })
    }
}

$.fn.extend({
    tabs:function(opts){
        let t = new Tab(this);
        t.init(opts);
        return this;
    },
    dialog:function(){
        let d = new Drag(this);
        d.position();
        d.mousedown();
    }
});