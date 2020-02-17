import React from 'react'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
    render() {
        return (
           <li>{this.props.txt}</li>
        );
    }
}

export default List;