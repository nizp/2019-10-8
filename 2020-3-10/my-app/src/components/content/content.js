import React from 'react'
import lazy from '../../router/lazy';
const UserList = lazy(()=>import('../userhandle/list')); //员工列表
const UserAdd = lazy(()=>import('../userhandle/add')); //添加员工

class ContentChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {match:{params:{id}}} = this.props;
        switch(id){
            case 'userlist':
                return <UserList />
            case 'useradd':
                return <UserAdd />
            default :
                return <UserList />
        }
    }
}

export default ContentChange;