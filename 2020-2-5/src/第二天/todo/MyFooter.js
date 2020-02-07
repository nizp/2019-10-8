import React, { Component } from 'react'
class MyFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>0</strong>
                    <span>条未选中</span>
                </span>
                <ul 
                    className="filters"
                >
                    <li>
                        <a 
                            href="#/all" 
                            className="selected"
                        
                        >全部</a>
                    </li>
                    <li>
                        <a 
                            href="#/unchecked" 
                            
                            className=""
                        >未选中</a>
                    </li>
                    <li>
                        <a 
                            href="#/checked"
                            className=""
                        >已选中</a>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default MyFooter;
