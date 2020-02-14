import React from 'react'
import ChildC from './ChildC';
class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                <span>子级</span>
                <hr />
                <ChildC />
            </>
        );
    }
}

export default ChildComponent;