
    // editing completed
    // editing ''
    // ''
    //completed
 
    new Vue({
        el:'.todoapp',
        data:{ 
            all:false,
            val:'',
            ary:[],
            hash:window.location.hash || '#/all'
        },
        created(){

            window.onhashchange = ()=>{
                this.hash = window.location.hash;
            }

            this.ary = getData();

        },
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

                // console.log(this.ary)
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
            replace({id},num){
                this.onoff_FN(id,true);//打开编辑框
                Vue.nextTick( ()=> {
                    // DOM 更新了
                    this.$refs.edit[num].focus(); //聚焦
                });
            },

            //失焦
            off({id,txt,onoff},ev){
              
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
            },
            //公共的是否失焦
            onoff_FN(id,b){
                this.ary.forEach(e=>{
                    if(e.id === id){
                        e.onoff = b;
                    }
                });
            }
        },
        filters:{
            unchecked(val){
                return val.filter(e=>!e.checked).length;
            }
        },


        computed:{
            hashAry(){
               
                const {ary,hash} = this;
                // console.log(ary)
                return ary.filter(item=>{
                    switch(hash){
                        case '#/all':
                            return item;
                        case '#/unchecked':
                            return !item.checked;
                        case '#/checked': 
                            return item.checked;
                        default:
                            return item;
                    }
                })
                // console.log(this.hash);
            }
        },
        watch: {
            ary:{
                handler(){
                    // console.log(this.ary);
                    this.all =  !!this.ary.length && this.ary.every(e=>e.checked);
                    if(this.ary.length){
                        localStorage.setItem('data',JSON.stringify(this.ary));
                    }
                },
                deep:true,
                immediate: true
            }
        }      
    })


    function getData(){
        let d = localStorage.getItem('data');
        return d?JSON.parse(d):[
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
    }

    /*
        虚拟DOM
            old {
                name:'ul',
                className:'list',
                children:[
                    {
                        key:0
                        name:'li',
                        className:'li1',
                        text:'哈哈'
                    }
                ]
            }

            new {
                name:'ul',
                className:'list',
                children:[
                    {
                        key:0,
                        name:'li',
                        className:'li1',
                        text:'哈哈'
                    },
                    {
                        key:1,
                        name:'li',
                        className:'li1',
                        text:'呵呵'
                    }
                ]
            }

            <ul class="list">
                <li class="li1">哈哈</li>
            </ul>

        如果只是*展示*一次
        <ul id="ul1">
            <li v-for="(val,key) in ary" :key="key"></li>
        </ul>

        <ul id="ul2">
            <li v-for="(val,key) in ary2" :key="`ul2${key}`"></li>
        </ul>

    */

    console.dir(box)