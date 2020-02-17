import React from 'react'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
    render() {
        let {store:{getState,dispatch}} = this.props;
        return (
            <div>
                <button
                    onClick={()=>{dispatch({type:'ADD'})}}
                >{getState().num}</button>
            </div>
        );
    }
   
    
}


export default App;