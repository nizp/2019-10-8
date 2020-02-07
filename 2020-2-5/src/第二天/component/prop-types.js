import React from 'react'
import PropTypes from 'prop-types';
class App7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:1
        };
    }
    render() {
        const {num} = this.state;
        return (
            <>
                <div>父组件{num}</div>
                <hr />
                <A7Child 
                    pnum={num} 
                />
            </>
        );
    }
}



class A7Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {pnum} = this.props;
        // if(typeof pnum === 'number'){
        //     return (
        //         <>
        //             <div>子组件_数字版{pnum}</div>
        //         </>
        //     );
        // }else if(typeof pnum === 'string'){
        //     return (
        //         <>
        //             <div>子组件_字符串版{pnum}</div>
        //         </>
        //     );
        // }

        return (typeof pnum === 'number'?<div>子组件_数字版{pnum}</div>:<div>子组件_字符串版{pnum}</div>);



        
    }
}

// A7Child.propTypes = {
//     pnum:PropTypes.number
// }

//数据可以是数字也可以是字符串
A7Child.propTypes = {
    pnum:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}





export default App7;