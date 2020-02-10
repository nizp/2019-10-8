class Vue {
    constructor(opt){
        this.$el = opt.el;
        this.$data = opt.data;
        this.computed = opt.computed;
        //专门就是来编译模板的
        if(this.$el){

            for(let key in  this.computed){
                Object.defineProperty(this.$data,key,{
                    get:()=>{
                        return this.computed[key].call(this)
                    }
                });
            }

            new Obsever(this.$data);
            this.proxyVM(this.$data);
            new Complier(this.$el,this);
        }
    }
    // this.num = this.$data.num
    proxyVM(data){
        for(let key in data){
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                }
            })
        }
    }
}
//编译器(把数据挂在DOM中)
class Complier {
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);
        this.vm = vm;
        // console.log(this.el);
        //创建一个文档碎片（打算把DOM中的节点都放到内存中操作,提高性能）
        let frag = this.fargmentNode(this.el);

        //处理文档碎片中的属性
        this.complie(frag);

        //把编译好的内容插入到页面
        this.el.appendChild(frag);
    }

    //判断是否为元素节点
    isElementNode(node){
        return node.nodeType === 1;
    }
    fargmentNode(node){
        //创建文档碎片
        let frag = document.createDocumentFragment();
        let firstChild;
        //把app中的第一个娃剪切出来放到文档碎片中
        while(firstChild = node.firstChild){
            frag.appendChild(firstChild)
        }
        return frag;
    }
    complie(frag){
        //从文档碎片中获取到子节点
        const nodes = [...frag.childNodes];
        //循环子节点查看是否有v-开头的或者{{}}
        nodes.forEach(node=>{
            if(this.isElementNode(node)){
                //找到元素节点的属性
                let attrs = [...node.attributes];
                attrs.forEach(attr=>{
                    // /^v-/.test(attr.nodeName)
                    //看头是否为v-的属性，如果是就把数据中的值取出来赋值给元素的属性
                    if(attr.nodeName.startsWith('v-')){
                        let {nodeValue} = attr;
                        //value就是data中的数据（页面跟着数据的更新而变化）
                        new Watcher(this.vm,nodeValue,(newVal)=>{
                            node.value = newVal; //把最新的数据赋值给input的value
                            console.log('只要notify出发就会执行回调')
                        });
                        let value = this.vm.$data[nodeValue];
                        node.oninput = (ev)=>{
                            this.vm.$data[nodeValue] = ev.target.value; //set
                            // console.log(this.vm.$data[nodeValue])      
                        }
                        node.value = value;
                    }
                });
            }else{
                if(/\{\{(\w+)\}\}/.test(node.nodeValue)){
                    // console.log(node)
                    let str = node.nodeValue,
                    key;
                    let attr = str.replace(/\{\{(\w+)\}\}/,(...arg)=>{
                        // console.log(arg)
                        key = arg[1];
                        return this.vm.$data[arg[1]];
                    });

                    new Watcher(this.vm,key,(newVal)=>{
                        node.nodeValue = newVal; //把最新的数据赋值给有小胡子的{{}}文本
                    });

                    node.nodeValue = attr;
                }
            }
        });
        // console.log(nodes);
    }
}



//发布订阅器
class Dep {
    constructor(){
        this.sub = [];//存放Watcher的池子
    }
    //订阅
    addSub(watcher){
        console.log('watcher',watcher)
        this.sub.push(watcher);
    }
    //发布
    notify(){
        console.log('发布收集的事务')
        this.sub.forEach(watcher=>{
            watcher.update();
        });
    }
}


//观察者模式，通过监控当前值的变化来关联视图

//当新值和老值不一样的时候执行回调函数
class Watcher {
    //vm -> vm.$data   key -> 监控的数据  cb -> 数据变化之后的回调
    constructor(vm,key,cb){
        //当实例化Watcher的时候把实例挂到Dep的属性下,方便所有的人去拿
        Dep.target = this; //let target = this
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.oldVal = this.get();
        //把实例用完之后把Dep.target给置空，防止只要是get数据就push Watcher
        Dep.target = null;
    }
    get(){
        let val = this.vm.$data[this.key];
        return val;
    }
    update(){
        let newVal = this.get(); //设置的时候才拿得到新值
        if(newVal !== this.oldVal){
            this.cb(newVal); //执行回调函数
        }
    }
}



//专门用来进行数据劫持的（把data中的所有数据都进行一个数据劫持）
class Obsever {
    constructor(data){
        this.obsever(data);
    }
    //循环对象，然后把进行数据劫持操作
    obsever(data){
        if(data && Object.prototype.toString.call(data) === '[object Object]'){
            for(let key in data){
                this.defineReactive(data,key,data[key]);
            }
        }
    }
    //数据劫持
    defineReactive(obj,key,value){
        //如果对象的值还是为对象，那么进行深度递归（目的就是为了让引用类型有数据劫持的特性）
        if(typeof value === 'object'){
            this.obsever(value);
        }
        let dep = new Dep();
        Object.defineProperty(obj,key,{
            get(){
                //在获取数据的时候进行订阅
                Dep.target && dep.addSub(Dep.target);
                console.log('出发了多少次',key)
                return value;
            },
            set:(newVal)=>{
                console.log('进了set')
                //在设置value值的时候如果新值和老值不相等就更新数据
                if(value !== newVal){
                    this.obsever(newVal); //保证新赋值的数据也被数据劫持了
                    value = newVal;
                    //在数据发生变化的时候进行watcher发布
                    dep.notify();
                    // console.log(111)
                }
            }
        })
    }
}


