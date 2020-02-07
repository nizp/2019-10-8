import React,{Component} from 'react';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0
        };
    }
    render() {
        const {num} = this.state;
        
        return (
            <>
                <div>哈哈</div>
                <hr />
                <button onClick={this.click}>{num}</button>
                {/*<button>{[1,2,3]}</button>*/}
            </>
        );
    }

    click = () => {
        console.log('修改之前');
        console.log(this.state.num)

        this.setState((prev)=>({num:prev.num+1}),()=>{
            console.log('修改成功');
            console.log(this.state.num)
        })

        // this.setState({
        //     num: ++ this.state.num
        // },()=>{
        //     console.log('修改成功');
        //     console.log(this.state.num)
        // })
    }
}

export default App;
