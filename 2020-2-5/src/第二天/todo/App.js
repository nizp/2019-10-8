import React from 'react'
import './布局/css/index.css';
import MyHeader from './MyHeader';
import MyMain from './body/MyMain';
import MyFooter from './MyFooter';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val:'',
            ary:[
                {
                    id:0,
                    txt:'禁止使用野生动物',
                    checked:false
                },
                {
                    id:1,
                    txt:'不要随便返京',
                    checked:false
                },
                {
                    id:2,
                    txt:'半夜记得翻墙进小区',
                    checked:true
                }
            ]
        };
    }
    render() {
        const {val,ary} = this.state;
        return (
            <section className="todoapp">
                <div>
                    <MyHeader 
                        val={val}
                        pchangeval={this.changeVal}
                        padd={this.addAry}
                    />
                    <MyMain pary={ary} pchecked={this.changeChecked}/>
                    <MyFooter/>
                </div>
            </section>
        );
    }
    //修改内容
    changeVal = (str) => {
        if(typeof str === 'string'){
            this.setState({val:str});
            return;
        }
    }

    //切换每个checked值
    changeChecked = (id) => {
        let {ary} = this.state;
        for(let i=0;i<ary.length;i++){
            if(ary[i].id === id){
                ary[i].checked = !ary[i].checked;
                break;
            }
        }
        this.setState({ary});
    } 

    //添加数据
    addAry = (val) => {
        let {ary} = this.state;
        ary.unshift({
            id:Date.now(),
            txt:val,
            checked:false
        });
        this.setState({ary});
    }

}

export default TodoApp;