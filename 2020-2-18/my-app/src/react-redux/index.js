import React,{Component} from 'react';
import MyContext from './context';

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

function connect(mapstate,mapdispatch){
    return function(Component){//传进来的组件
        return class extends Component {//匿名类
            static contextType = MyContext;
            constructor(props,context){
                super(props);
                this.state = mapstate(context.getState());
                // console.log(context.getState())
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

            render(){
                return (
                    <Component {...this.state}/>
                )
            }
        }
    }
}

export {connect}
