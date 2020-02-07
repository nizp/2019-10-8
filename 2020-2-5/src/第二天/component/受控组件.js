import React,{Component} from 'react';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ary:['疫情无情','人有情','不出门','出门带口罩'],
            val:'',
            checked:false
        };
    }
    render() {
        const {ary,val,checked} = this.state;
        let list = ary.map((item,i)=><li key={i}>{item}</li>);

        return (
            <>
                <button onClick={this.add}>添加数据</button>
                <input 
                    type="checkbox" 
                    onChange={this.checkbox}
                    checked={checked}
                />
                <input 
                    type="text" 
                    /*  defaultValue={val}*/
                    value={val}
                    onChange={this.change}
                />

                {val}
                <ul>{list}</ul>
            </>
        );
    }
    add = () => {
        const {ary,val} = this.state;
        ary.push(val);
        this.setState({ary,val:''});
        // const {ary,val} = this;
        // ary.push(val)
    }
    change = (ev) => {
        // console.log(ev.target.value)     v-model="val"  
        this.setState({val:ev.target.value});
    }
    checkbox = (ev) => {
        console.log(ev.target.checked);
        this.setState({checked:ev.target.checked});
    }
}

export default App;
