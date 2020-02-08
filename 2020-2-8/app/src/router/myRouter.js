// class MyRouter {
//     constructor(){
//         console.log(1)
//     }
// }

/*
    我们需要一个路由状态,需要通过这个状态的变化去更改组件
    hashchange

*/

class History {
    constructor(){
        //就是路由的状态
        this.current = null;
    }
}
// {current:'/home'}

function MyRouter(opt){
    if(this){
        this.mode = opt.mode || 'hash';
        this.routes = opt.routes || [];
        this.routeMap = this.createMap(this.routes);
        this.history = new History;
        this.init();//初始化路由
        // console.log(this.routeMap)
    }
}

MyRouter.prototype = {
    constructor:MyRouter,
    createMap(routes){
        return routes.reduce((prev,next)=>{
            prev[next.path] = next.component;
            return prev
        },{});
        /*
            prev:{'/':Home}  prev[next.path] = next.component
            next:{
                path: '/',
                component: Home
            }
        */
    },
    init(){
        //走的是hash路由
        if(this.mode === 'hash'){
            // #/
            if(!location.hash)location.hash = '/';
            window.addEventListener('load',()=>{
                this.history.current = location.hash.slice(1);
                // console.log(this.history.current)
            });
            window.addEventListener('hashchange',()=>{
                this.history.current = location.hash.slice(1);
            });
        }else if(this.mode === 'history'){//走的是history路由
            if(!location.pathname)location.pathname = '/';
            window.addEventListener('load',()=>{
                this.history.current = location.pathname;
            });
            window.addEventListener('popstate',()=>{
                this.history.current = location.pathname;
                // console.log(this.history.current)
            })
        }
    },
    push(){

    }
}



/*
    obj = {
        '/home':Home,
        '/about':About
    }

    $route
    $router
*/


//只要是使用了Vue.use(xxx),那么就会调用xxx.install方法
MyRouter.install = function(Vue){
    Vue.mixin({
        beforeCreate() {
            // console.log(1);
            //要做让每个组件都能拿到MyRouter实例。
            //说明是根组件
            if(this.$options && this.$options.router){
                //把根组件赋值给_root
                // this._root = this;
                this._router = this.$options.router;
                // console.log(this)
                // console.log(this._router.history)
                Vue.util.defineReactive(this,'xxx',this._router.history);

            }else{
                //不是根组件,是子组件
                // this._root = this.$parent._root;
                this._router = this.$parent._router;
                //  console.log( this._router )
            }

            /*
                current:'/home',
                pathname:'/home',
                query:{a:'a'},
                hash:'#xx'
            */
            //给每个组件添加一个$route和$router的属性
            Object.defineProperty(this,'$route',{
                get(){
                    //this为当前的组件
                    // console.log(this._router)
                    return {
                        current:this._router.history.current
                    }
                }
            })

            //push,replace
            Object.defineProperty(this,'$router',{
                get(){
                    return {b:6}
                }
            })

        },
    });

    Vue.component('router-view',{
        render(h){
            let {history:{current},routeMap} = this._self._router;

            // console.log(current,routeMap)
            return h(routeMap[current])
        }
    })
}





export default MyRouter