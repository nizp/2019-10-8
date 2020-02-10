// (function (global, factory) {
//     global.Vuex = factory();
// })(this,);
export default (function(){
    let _Vue; //就是为了监控数据的变化来更新视图
    class Store {
        constructor(opt){
            //解决视图更新的问题
            let vm = new _Vue({
                data:{
                    state:opt.state || {}
                }
            });
            //vm.$data.state就被深度监控
            //  this.state = vm.state
            this.state = vm.state; //赋址关系
            // this.state = opt.state || {};
            this.mutations = opt.mutations || {};
            this.actions = opt.actions || {}

            let commit =  this.commit; //存的是store的commit
            this.commit = (type,payload) =>{
                commit.call(this,type,payload)
            }

            let dispatch =  this.dispatch; //存的是store的dispatch
            this.dispatch = (type,payload) =>{
                dispatch.call(this,type,payload)
            }
        }
        commit(type,payload){
            // console.log(this,222);
            this.mutations[type](this.state,payload);           
        }
        dispatch(type,payload){
            this.actions[type](this.commit,payload);
        }
    }
    //VueRouter.install
    //只要使用了use，那么就会调用对象的下的install方法
    function install (Vue){
        _Vue = Vue;
        // console.log(1);
        //混入
        Vue.mixin({
            beforeCreate() {
                //说明是Vue根
                if(this.$options && this.$options.store){
                    this._store = this.$options.store;
                }else{
                    this._store = this.$parent && this.$parent._store;
                }

                Object.defineProperty(this,'$store',{
                    get(){
                        // console.log(this._store)
                        return this._store;
                    }
                });
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
        obj[item] = this._store.state[item]
    });
    return obj;
}



// export function mapMutations(ary){
//     // let obj = {}
//     // console.log(this)
//     //obj['add'] =  this._store.mutations['add']()
//     // ary.forEach(key=>{
//     //     console.log(this._store.mutations[key](this._store.state))
//     //     // obj[key] =  this._store.mutations[key](this._store.state)
//     // });
// }



