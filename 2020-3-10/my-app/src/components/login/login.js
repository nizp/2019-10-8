import React from 'react';
import './css/reset.min.css';
import './css/iconfont.css';
import './css/login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; //图标
import {loginAPI} from './../../api/api';
import md5 from 'js-md5';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onFinish = values => {
        const {user,pass} = values;
        const {history:{replace}} = this.props;
        loginAPI({account:user,password:md5(pass)}).then(data=>{
            if(data.code === 0){
                replace('/home');
                // console.log(this.props);
            }
        });
    };

    render() {

        /*
            定义规则
        */
        const userRules = [
            {
                required: true,
                message: 'username input your Password!',
            },
            //自定义的规则，需要返回一个Promise对象
            ({ getFieldValue }) => ({
               
                validator(rule, value) {
                    // console.log(getFieldValue()) //getFieldValue()，对应属性的数据
                    if (/^[^\d].+/.test(value)) {
                        return Promise.resolve();
                    }
                    return Promise.reject('请正确输入用户名');
                },
            })
        ];

        const passRules = [
            {
                required: true,
                message: 'Please input your Password!',
            },
        ];


        return (
            <div>
                <div className="login_box">
                    <main className="mainBox">
                        <h1 className="title">CRM客户管理系统</h1>
                        <p className="tip">为保护企业的数据安全，请妥善保管密码</p>
                    
                        <section className="loginBox">
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    onFinish={this.onFinish}
                                >
                                    <Form.Item
                                        name="user"
                                        rules={userRules}
                                        validateTrigger="onBlur"
                                    >
                                        <Input 
                                            prefix={<UserOutlined className="site-form-item-icon" />} 
                                            placeholder="请输入用户名" 
                                            
                                        />
                                    </Form.Item> 
                                    <Form.Item
                                        name="pass"
                                        rules={passRules}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="请输入密码"
                                        />
                                       
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                    </Form.Item>
                            </Form>
                        </section>
                    </main>
                    <footer className="footerBox">
                        <span>北京珠峰世纪技术培训有限公司</span>
                        <span>京ICP备09041920号</span>
                        <span>京公网安备110108400531号</span>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Login;