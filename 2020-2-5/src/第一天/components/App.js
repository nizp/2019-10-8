import React,{Component} from 'react'
import './app.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0,
            num1:3,
            name:'李磊12'
        };

        // this.click = this.click.bind(this);

    }
    render() {
        const {num,num1,name} = this.state;
        return (
            <>
                <div className="red">真的不难1{name}</div>
                <div className="green">真香{num1}</div>
                <button onClick={this.click}>{num}</button>
                {/*<button onClick={(ev)=>this.click(ev)}>{num}</button>*/}
            </>
        );
    }
    //默认事件的this为undefined
    click = () => {
        let {num} = this.state;
        num ++;
        this.setState({num});
    }
}

export default App;