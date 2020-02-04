class Vue {
    constructor(opt){
        this.$el = opt.el;
        this.$data = opt.data;
        //专门就是来编译模板的
        if(this.$el){
            new Complier(this.$el,this);
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
        let frag = document.createDocumentFragment();
        let firstChild;
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
                        let value = this.vm.$data[nodeValue];
                        // console.dir(this.vm.$data[nodeValue])
                        // console.log(node)
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
                    let str = node.nodeValue;
                    let attr = str.replace(/\{\{(\w+)\}\}/,(...arg)=>{
                        // console.log(arg)
                        return this.vm.$data[arg[1]];
                    });
                    node.nodeValue = attr;
                }
            }
        });
        // console.log(nodes);
    }
}
