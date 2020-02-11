import React from 'react'
class PublicID extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        // console.log(this.props.match.params.id);
        return (
            <>
                <div>PublicID{this.props.match.params.id}页</div>
            </>
        );
    }
}

export default PublicID;