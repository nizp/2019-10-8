import React from 'react'
class NotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props);
        return (
            <>  
                <div>404</div>
            </>
        );
    }
}

export default NotPage;