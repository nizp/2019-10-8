import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
class MyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {ary,changeAllfn,collectfn,changeSelect,select,collect,deletfn,add,addfn} = this.props;
        
        let aryname = [];
        switch(select){
            case 'all':
                aryname = ary;
            break;
            case 'collect':
                aryname = collect;
            break;
            case 'add':
                aryname = add;
            break;
            default:
                aryname = ary;
        }


        let flag = aryname.length?aryname.every(item=>item.checked):false;
        return (
            <div>
                <div className="select">
                    <span className="selectAll" onClick={()=>{changeAllfn(!flag)}}>{flag?'✔️':''}<span>全选</span></span>
                    
                    <div className="others">
                        <span 
                            className="allList" 
                            style={{display:select==='all'?'none':'inline-block'}}
                            onClick={()=>{changeSelect('all')}}
                        >全列表</span>
                        <span
                            style={{display:select==='collect'?'none':'inline-block'}}
                        >
                            <em 
                                onClick={collectfn}
                                className="type1"
                            ></em>
                            <dfn 
                                onClick={()=>{changeSelect('collect')}}
                            >收藏歌曲{`[${collect.length}]`}</dfn></span>
                        <span
                            style={{display:select==='add'?'none':'inline-block'}}
                        >
                            <em 
                                className="type2" 
                                onClick={addfn}
                            ></em>
                            <dfn 
                                onClick={()=>{changeSelect('add')}}
                            >添加{`[${add.length}]`}</dfn>
                        </span>
                        <span onClick={deletfn}><em className="type3"></em>删除</span>
                    </div>
                </div>
            </div>
        );
    }
    click =() => {
        console.log(1)
    }
}

export default connect(state=>(state),actions)(MyFooter);
