import React,{useEffect} from 'react'
import { Form, Input, Button } from 'antd'
import {connect} from 'react-redux'
import Cookie from 'js-cookie'

import './index.less'
import {login} from '../../redux/actions/userAction'

const Login = ({user,login,history}) => {
    const onFinish = values => {
        login(values)
    }

    useEffect(() => {
        const _id = Cookie.get('_id')
        if(_id){
            history.replace('/')
        }
    }, [user._id])

    return (
        <div className="login-page">
            <div className="form-wrapper">
                <h1 className="title">后台管理</h1>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空!' }]}
                    >
                        <Input placeholder="用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                        <Input.Password placeholder="密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default connect(
    state=>({
        user:state.user
    }),
    {login}
)(Login)
