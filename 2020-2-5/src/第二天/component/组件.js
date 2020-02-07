import React from 'react'
import './1.css';
class App8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:true,
            cm:'skyblue'
        };
    }
    render() {
        const { show , cm } = this.state
        return (
            <>
                <div 
                    style={{display:show?'block':'none'}}
                    className={cm}
                >有内容</div>
            </>
        );
    }
}

export default App8;