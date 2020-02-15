import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
class MyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {ary,changeAllfn,collectfn} = this.props;
        let flag = ary.every(item=>item.checked);
        return (
            <div>
                <div className="select">
                    <span className="selectAll" onClick={()=>{changeAllfn(!flag)}}>{flag?'✔️':''}<span>全选</span></span>
                    <div className="others">
                        <span><em></em><dfn onClick={collectfn}>收藏歌曲</dfn></span>
                        <span><em></em>添加</span>
                        <span><em></em>删除</span>
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
