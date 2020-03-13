import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {powerAPI} from '../../api/api';
import './home.css';
import ContentChange from '../content/content';
import {
    Redirect,
    Route,
    withRouter
} from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;






class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plist:[],
            icons:[<UserOutlined />,<LaptopOutlined />,<NotificationOutlined />],
            openKeys:['sub0']
        };
        this.rootSubmenuKeys = ['sub0','sub1','sub2'];
    }
    componentDidMount(){
        //进行数据请求
        powerAPI().then(d=>{
            if(d.code === 0){
                const {pList} = d;
                this.setState({plist:pList});
            }
        });
    }
    onOpenChange = (openKeys) => {
        //openKeys就是打开了几个菜单，是个数组
        // console.log(openKeys)    
        
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
        
    }

    click = ({item, key, keyPath, domEvent}) => {
        // console.log(item, key, keyPath, domEvent)
        // console.log(this.props.history.push)
        this.props.history.replace(item.props.data.path);
    }

    render(){
        let subMenu = [];
        const {plist,icons,openKeys} = this.state;
        if(plist.length){
            subMenu = plist.map((ele,index)=>{
                return (
                    <SubMenu
                        key={'sub'+index}
                        title={
                            <span className="list_title">
                            {icons[index]}
                            {ele.name}
                            </span>
                        }
                        >
                        {ele.children && ele.children.map((child,i)=><Menu.Item data={child} key={'sub'+index+i}>{child.name}</Menu.Item>)}
                    </SubMenu>
                )
            })
        }

        console.log(this.props)

        return (
            <div className="home">
                <Layout>
                    <Header className="header">
                        <div className="logo">
                            CRM-客户管理系统
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">组织结构</Menu.Item>
                            <Menu.Item key="2">客户管理</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                onOpenChange={this.onOpenChange}
                                mode="inline"
                                theme="dark"
                                defaultSelectedKeys={['sub00']}
                                defaultOpenKeys={['sub0']}
                                openKeys={openKeys}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.click}
                            >
                                {subMenu}
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            }}
                        >
                        <ContentChange {...this.props}/>
                        </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>   
        )
                        
    }
}

export default Home;