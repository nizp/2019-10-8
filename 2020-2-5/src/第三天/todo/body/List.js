import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onoff:false,
            esc:false
        };
    }
    render() {
        //editing completed
        const {checked,txt} = this.props;
        const {onoff} = this.state;
        let sclass = checked?'completed':'';
        if(onoff){
            sclass += ' editing';  //'completed editing'
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
                    <label onDoubleClick={this.db}>{txt}</label>
                    <button className="destroy" onClick={this.rm}></button>
                </div>
                <input 
                    className="edit" 
                    ref="edit"
                    onBlur={this.blur}
                    onKeyUp={this.esc}
                />
            </li>
        );
    }

    blur = () =>{
        if(this.state.esc){
            this.setState({esc:false}); 
            return;
        }
        const {replacetxt,id} = this.props;
        let val = this.refs.edit.value.trim();
        if(val){
           replacetxt(id,val);
        }
        this.setState({onoff:false,esc:false});
    }
    db = () => {
        this.setState({onoff:!this.state.onoff},()=>{
            this.refs.edit.value = this.props.txt;
            this.refs.edit.focus();
        });
    }
    change = (ev) => {
        // console.log(ev.target.checked)
        let {pchecked,id} = this.props;
        pchecked(id);
    }
    rm = () => {
        this.props.premove(this.props.id);
    }
    esc = (ev) => {
        if(ev.keyCode === 27){
            this.setState({esc:true,onoff:false});
        }
    }
}

export default List;