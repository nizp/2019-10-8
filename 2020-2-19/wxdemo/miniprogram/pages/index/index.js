//index.js
const app = getApp();
const {revers} = require('../../utils');
console.log(1,app);
console.log(revers('习学'));

// {{}}  {}

console.log(window,document)
Page({
    data:{
        num:10,
        ary:[
            {
                id:0,
                txt:'小程序还不错',
                checked:false
            },
            {
                id:1,
                txt:'小程序好学',
                checked:true
            }
        ]
    },
    changed(ev){
        //通过ev.target去找自定义属性
        const {id} = ev.target.dataset;
        this.data.ary.forEach(item=>{
            if(item.id === id){
                item.checked = !item.checked;
            }
        });
        //修改完数据之后,更新数据
        this.setData({ary:this.data.ary});
        // console.log(ev.target.dataset.id)
    },
    click(){
        // console.log(this.data)
        this.setData({
            num:++this.data.num
        });
    }
});
