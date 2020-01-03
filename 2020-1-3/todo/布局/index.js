
    // editing completed
    // editing ''
    // ''
    //completed
 
    new Vue({
        el:'.todoapp',
        data:{ 
            all:false,
            val:'',
            ary:[
                {
                    id:0,
                    txt:'哈哈',
                    checked:false,
                    onoff:false
                },
                {
                    id:1,
                    txt:'呵呵',
                    checked:true,
                    onoff:false
                }
            ]
        },
        // //当数据挂载好之后（数据请求之后获取数据的地方）
        // created(){  
        //     this.ary = [
        //         {
        //             id:0,
        //             txt:'哈哈',
        //             checked:true,
        //             onoff:false
        //         },
        //         {
        //             id:1,
        //             txt:'呵呵',
        //             checked:true,
        //             onoff:false
        //         }
        //     ];
        //     this.all = this.ary.every(e=>e.checked);
        // },
        methods:{
            //按回车创建数据
            add(){
                if(!this.val)return;
                this.ary.unshift( {
                    id:+new Date,
                    txt:this.val,
                    checked:false,
                    onoff:false
                })
                this.val = '';

                console.log(this.ary)
            },
            //删除
            rm(id){
                this.ary = this.ary.filter(e=>e.id !== id)
            },
            //切换全选
            changeAll(ev){
                this.ary = this.ary.map(e=>{
                    e.checked = ev.target.checked;
                    return e;
                });
            },
            //双击修改
            replace({id,txt},num){
               
                // this.ary.forEach(e=>{
                //     if(e.id === id){
                //         e.onoff = true;
                //     }
                // });
                this.onoff_FN(id,true);
                this.$refs.edit[num].value = txt;
                /*
                    改变数据之后，一个元素会刷新，刷新之后就看不见select
                */
                Vue.nextTick( ()=> {
                    // DOM 更新了
                    this.$refs.edit[num].focus();  
                })
                // setTimeout(() => {
                //     this.$refs.edit[num].focus();   
                // });
            },
            off({id,txt,onoff},ev){
                // console.log(onoff) //onoff为false说明已经关闭了修改框，有可能是按了esc键
                if(!onoff)return;
                const {value} = ev.target;
                //有内容并且内容不一样，这个时候才需要修改数据
                if(value && txt != value){
                    this.ary.forEach(e=>{
                        if(e.id === id){
                            e.txt = value;
                        }
                    });
                }
                this.onoff_FN(id,false);
                // this.ary.forEach(e=>{
                //     if(e.id === id){
                //         e.onoff = false;
                //     }
                // });
            },
            onoff_FN(id,b){
                this.ary.forEach(e=>{
                    if(e.id === id){
                        e.onoff = b;
                    }
                });
            }
        },


        // computed:{
        //     watchAll(){
        //         return this.ary.every(e=>e.checked);
        //     }
        // },
        watch: {
            ary:{
                handler(){
                    // console.log(this.ary);
                    this.all = this.ary.every(e=>e.checked);
                },
                deep:true,
                immediate: true
            }
        },
            
    })