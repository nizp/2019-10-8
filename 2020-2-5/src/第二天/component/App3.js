import React,{Component} from 'react';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ary:['疫情无情','人有情','不出门','出门带口罩']
        };
    }
    render() {
        const {ary} = this.state;
        let list = ary.map((item,i)=><li key={i}>{item}</li>);

        return (
            <>
                <button onClick={this.add}>添加数据</button>
                <input type="text" ref="txt"/>
                <ul>{list}</ul>
                {/*<ul>{ary.map((item,i)=><li key={i}>{item}</li>)}</ul>*/}
            </>
        );
    }
    add = () => {
        const {ary} = this.state;
        ary.push(this.refs.txt.value);
        this.setState({ary});

        // this.state.ary.push(this.refs.txt.value);
        // this.setState({});
    }
}

export default App;
