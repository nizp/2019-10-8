import React from 'react'
import './布局/css/index.css';
import MyHeader from './MyHeader';
import MyMain from './body/MyMain';
import MyFooter from './MyFooter';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        let hash = window.location.hash?window.location.hash.slice(1):'/all';
        this.state = {
            hash,
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
        const {val,ary,hash} = this.state;
        let footer = null;
        if(ary.length){footer = <MyFooter 
                num={ary.filter(item=>!item.checked).length}
                chash={this.phash}
                hash = {hash}
            />   
        }

        let ary2 = ary.filter(item=>{
            switch(hash){
                case '/all':
                    return item;
                case '/unchecked':
                    return !item.checked;
                case '/checked':
                    return item.checked;
                default:
                    return item;
            }
        });

        // console.log(hash)



        return (
            <section className="todoapp">
                <div>
                    <MyHeader 
                        val={val}
                        pchangeval={this.changeVal}
                        padd={this.addAry}
                    />
                    <MyMain 
                        pary={ary2} 
                        pchecked={this.changeChecked}
                        premove={this.removeNode}
                        replacetxt={this.replacetxt}
                    />
                    {footer}
                </div>
            </section>
        );
    }

    //修改hash

    phash = (hash) => {
        this.setState({hash})
    }

    //修改内容
    changeVal = (str) => {
        if(typeof str === 'string'){
            this.setState({val:str});
            return;
        }
    }
    //修改数据
    replacetxt = (id,newVal) => {
        let {ary} = this.state;
        for(let i=0;i<ary.length;i++){
            if(ary[i].id === id){
                ary[i].txt = newVal;
                break;
            }
        }
        this.setState({ary});
    }
    //remove
    removeNode = (id) => {
        let {ary} = this.state;
        ary = ary.filter(item=>item.id !== id);
        this.setState({ary});
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