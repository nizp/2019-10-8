import React from 'react'
import {userListAPI} from '../../api/api'
import { Card,Table, Radio, Divider } from 'antd';
import './list.css';
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                
              ],
            columns : [
                {
                  title: '姓名',
                  dataIndex: 'name',
                },
                {
                  title: '性别',
                  dataIndex: 'sex',
                },
                {
                  title: '部门',
                  dataIndex: 'department',
                },
                {
                    title: '职务',
                    dataIndex: 'job',
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                },
                {
                    title: '描述',
                    dataIndex: 'desc'
                },
              ]
        };
    }
    componentDidMount(){
        const {departmentId} = JSON.parse(sessionStorage.getItem('power'))
        userListAPI({departmentId}).then(d=>{
            let data = d.data;
            data.forEach(item => {
                item.sex = item.sex === 0?'男':'女';
                item.key = item.id
            });
            this.setState({data})
        })
    }
    render() {
      
        return (
            <div>
                <Card >
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        bordered
                    />
                </Card>
            </div>
        );
    }
}

export default List;