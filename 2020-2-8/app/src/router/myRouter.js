class History {
    constructor(){
        this.current = null;
    }
}
function MyRouter(opt){
    if(this){
        this.mode = opt.mode || 'hash';
        this.routes = opt.routes || [];
        this.routeMap = this.createMap(this.routes);
        this.history = new History;
        this.init();//初始化路由
    }
}
MyRouter.prototype = {
    constructor:MyRouter,
    createMap(routes){
        return routes.reduce((prev,next)=>{
            prev[next.path] = next.component;
            return prev
        },{});
    },
    init(){
        if(this.mode === 'hash'){
            if(!location.hash)location.hash = '/';
            this.history.current = location.hash.slice(1);
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
            })
        }
    },
    push(path){
        if(this.mode === 'hash'){
            location.hash = '#'+path;
        }
    }
}
MyRouter.install = function(Vue){
    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.router){
                this._router = this.$options.router;
                Vue.util.defineReactive(this,'xxx',this._router.history);
            }else{
                this._router = this.$parent._router;
            }
            Object.defineProperty(this,'$route',{
                get:()=>{
                    return {
                        current:this._router.history.current
                    }
                }
            });
            Object.defineProperty(this,'$router',{
                get(){
                    return this._router;
                }
            })
        },
    });
    Vue.component('router-view',{
        render(h){
            let {history:{current},routeMap} = this._self._router;
            return h(routeMap[current])
        }
    });
    Vue.component('router-link',{
        props:['to','tag'],
        methods:{
            click(ev,mode){
               console.log(mode);
                if(mode === 'hash'){
                    location.hash = ev.target.getAttribute('href').split('#')[1];
                }else{
                    location.pathname = ev.target.getAttribute('href');
                }
                
            }
        },
        render(){
            const {mode} = this._self._router;
            const {to} = this;
            if(this.tag){
                return <this.tag on-click={(ev)=>{this.click(ev,mode)}} href={mode==='hash'?`#${to}`:to}>{this.$slots.default}</this.tag>
            }
            return <a href={mode==='hash'?`#${to}`:to}>{this.$slots.default}</a>
        }
    })
}
export default MyRouter