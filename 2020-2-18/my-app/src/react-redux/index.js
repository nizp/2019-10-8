import React,{Component} from 'react';
import MyContext from './context';
import {bindActionCreators} from 'redux';
//bindActionCreators(actions,store.dispatch)

//把数据注入到MyContext下，并且把哪些组件能享受这个store数据给它确认
class Provider extends Component{
    render(){
        const {store,children} = this.props;
        return (
            <MyContext.Provider value={store}>
                {children}
            </MyContext.Provider>
        )
    }
}
export default Provider;

/*
    function fn(){}

    connect(mapstate)(App)
*/

function connect(mapstate,mapdispatch){
    return function(Components){//传进来的组件
        return class extends Component {//匿名类
            static contextType = MyContext;
            constructor(props,context){
                super(props);
                //初始化数据
                this.state = mapstate(context.getState());
                //如果直接访问this.context为undefined
                //直接读this又可以显示this.context
                //所以使用constructor传入context
                // console.log(context)
 
            }
            componentDidMount(){
                //在DOM渲染完成之后做一个监听，只要发起action就更新state
                this.unsubscribe = this.context.subscribe(()=>{
                    
                    this.setState(this.context.getState());
                });
            }
            componentWillUnmount(){
                //在组件销毁的时候取消state的监听
                this.unsubscribe();
            }
            
            //把映射的dispatch用bindActionCreators包裹一下
            //让组件中的this.props上挂上 actions下的方法
            dispatchFn = () => {
                let toS = Object.prototype.toString;
                // console.log(toS.call(mapdispatch))
                if(toS.call(mapdispatch) === '[object Module]'){
                    return bindActionCreators(mapdispatch,this.context.dispatch)
                }
                return this.context;
            }

            render(){
                // console.log(this.dispatchFn())
                return (
                    <Components {...this.state} {...this.dispatchFn()}/>
                )
            }
        }
    }
}

export {connect}
