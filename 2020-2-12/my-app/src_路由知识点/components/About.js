import React from 'react';
import {
    Link
} from 'react-router-dom';
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ary:[
                {
                    id:1,
                    txt:'稻香',
                },
                {
                    id:2,
                    txt:'夜曲',
                }
            ]
        };
    }
    render() {
        const {ary} = this.state;
        //生成一堆列表，并且把id带到link上，其实也就是说把要传的数据绑到了link上，当点击link的时候就把数据带到了相关联的页面中
        let links = ary.map(item=><Link {...{
            key:item.id,
            to:{
                pathname:'/about/'+item.id,
            }
        }}><li>{item.txt}</li></Link>);
        return (
            <>
               <h1>About</h1>
               <Link to="/"><button>返回到首页</button></Link>
               <hr />
               <ul> {links} </ul>
            </>
        );
    }
}

export default About;
