import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        //editing completed
        const {checked,txt} = this.props;
        let sclass = '';
        if(checked){
            sclass = 'completed';
        }
        return (
            <li className={sclass}>
                <div className="view">
                    <input 
                        className="toggle" 
                        type="checkbox" 
                        checked={checked}
                        onChange={this.change}
                    />
                    <label>{txt}</label>
                    <button className="destroy"></button>
                </div>
                <input 
                    className="edit" 
                />
            </li>
        );
    }
    change = (ev) => {
        // console.log(ev.target.checked)
        let {pchecked,id} = this.props;
        pchecked(id);
    }
}

export default List;