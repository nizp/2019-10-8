export default (function(){
    let _Vue; //就是为了监控数据的变化来更新视图
    class Store {
        constructor(opt){
            //解决视图更新的问题
            this.vm = new _Vue({
                data:{
                    state:opt.state || {}
                }
            });
           
            let state = this.vm.state;
            // this.state = vm.state; //赋址关系

            //处理mutations
            this.mutations = {}; //this.mutations初始化
            let mutations = opt.mutations;//接收传进来的mutations（配置的mutations）

            //把mutations下的方法重新改写，挂到this.mutations下(保证this和参数传递是没有错误的)

            let Each = (obj,cb) => {
                Object.keys(obj).forEach(fnName=>cb(fnName,obj[fnName]))
            }
            
            // {add:()=>{fn.call(this)}}
            Each(mutations,(fnName,mutationsFn)=>{
                this.mutations[fnName] = (...arg)=>{
                    mutationsFn.call(this,state,...arg);
                };
            });

            //重写this.actions
            this.actions = {};
            let actions = opt.actions;
            Each(actions,(fnName,actionsFn)=>{
                this.actions[fnName] = (...arg)=>{
                    actionsFn.call(this,this.commit,...arg);
                };
            });


            //解决了actions调用commit的this指向问题
            let commit =  this.commit; //存的是store的原型下的commit
            //自身的commit
            this.commit = (type,...payload) =>{
                commit.call(this,type,...payload)
            }

            let dispatch =  this.dispatch; //存的是store的dispatch
            this.dispatch = (type,...payload) =>{
                dispatch.call(this,type,...payload)
            }
        }

        get state(){
            return this.vm.state; //defineProperty
        }

        commit(type,...payload){
            // console.log(this,'看看this')     
            this.mutations[type](...payload);    
        }
        dispatch(type,...payload){
            this.actions[type](...payload);
        }
    }
    //VueRouter.install
    //只要使用了use，那么就会调用对象的下的install方法
    function install (Vue){
        _Vue = Vue;
        //混入
        Vue.mixin({
            beforeCreate() {
                //说明是Vue根
                if(this.$options && this.$options.store){
                    this.$store = this.$options.store;
                }else{
                    this.$store = this.$parent && this.$parent.$store;
                }
            },
        });
    }

    return {
        Store,
        install
    }
})();


export function mapState(ary){
    let obj = {};
    ary.forEach(item=>{
        obj[item] = this.$store.state[item]
    });
    return obj;
}


