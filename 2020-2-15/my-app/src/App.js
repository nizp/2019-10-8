import React from 'react';
import './css/baidu.css';
import MyFooter from './components/MyFooter';
import Main from './components/body/Main';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
            <div className="wrap">
			<div className="baidu">
                <Main />
				<MyFooter />
			</div>
		</div>
            </div>
        );
    }
}

export default App;
