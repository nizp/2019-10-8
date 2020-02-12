import React from 'react'
class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val:this.props.val
        };
    }
    render() {
        let {val} = this.state;
        return (
            <header className="header" >
                <h1>todos</h1>
                <input 
                    className="new-todo" 
                    placeholder="请输入内容" 
                    value={val}
                    onChange={this.change}
                    onKeyUp={this.keyup}
                />
            </header>
        );
    }
    change = (ev) => {
        this.setState({val:ev.target.value});
        this.props.pchangeval(ev.target.value);
    }
    keyup = (ev) => {
        if(ev.keyCode === 13){
            this.props.padd(this.state.val);
            this.setState({val:''})
        }
    }
}

export default MyHeader;