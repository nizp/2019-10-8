# React

    - 用于构建用户界面的 JavaScript 库 -- 专注于视图层（顶多算一个MVC中的V层）

    - 生态(react-native) 、背景大

### 如何学习呢？
    - JSX语法
        JS XML
    - 组件化（受控组件和非受控组件）
    - 生命周期函数

### 安装环境
    - npx create-react-app my-app


### 引包
    ```
        import React from 'react';
        import ReactDOM from 'react-dom';


        ReactDOM.render(元素|组件|React.createElement(),挂载点,挂载成功的回调)
    ```

### 申明组件
    ```
        第一种方式是用类来申明(天生就是有态的->this.state)
            class App extends Component {
                constructor(props) {
                    super(props);
                    this.state = {  };
                }
                render() {
                    return (
                        <>
                            <div>哈哈</div>
                        </>
                    );
                }
            }
        第二种方式是用函数来申明(天生是无态的，但是可以使用hooks让他变得有态)
            function App2(){
                return <div>123</div>
            }

    ```

### react语法
```
    class的方式去声明一个组件render中return后的内容就是模板

    this.state 存放数据的
    this.setState({})  专门更新数据的（既可以是同步也可以是异步）
        对象的方式:
            第一个参数修改state中的状态
            第二个参数就是改变状态之后的回调
                this.setState({
                    num: ++ this.state.num
                },()=>{
                    console.log('修改成功');
                    console.log(this.state.num)
                });
        
        函数的方式:
            第一个参数为函数(prev就是没改变之前的数据，this.state)
            * 必须要return一个对象 *
            this.setState((prev,props)=>({
                num:prev.num + 1
            }));

        refs 快速定位组件或者元素的
            定义 - ref="xx"
            使用 - this.refs.xx

        受控组件:
            表单元素中，如果要动态的绑定数据，难么这个组件就变成了受控组件(如果不添加修改val的逻辑，那么输入框中是不让输入的)
            <input type="text" value={val} onChange={this.change}/>

        非受控组件:
            也可以使用defaultValue={val}，让*一开始*的数据渲染到表单中，如果要再次修改数据，那么要使用onChange

        数据的单向流动:
            父传子 ->
                通过属性的方式传递
                    <Child pnum={this.state.num}>


                    //批量添加数据使用下面的方式
                    <P5Child {...{
                        pnum:num,
                        pnum2:num2,
                        pary:ary
                    }}/>

                    <P5Child 
                        pnum={num} 
                        pnum2={num2} 
                        pary={ary}
                    />

                子级接收
                    render(){
                        const {pum} = this.props;
                        return (
                            <div>{pum}</div>
                        )
                    }


```


### JSX语法
    ```
        组件的第一个字母一定要大写
        单标签必须要有结束符
        顶层只能有一个组件
        凡是带class的要变成className
        {}里面可以放表达式（注释），把数组扩展出来
    ```



