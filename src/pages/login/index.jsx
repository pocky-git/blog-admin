import { Form, Input, Button } from 'antd'
import {connect} from 'react-redux'

import './index.less'
import {login} from '../../redux/action'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const Login = ({user,login}) => {
    const onFinish = values => {
        login(values)
    }

    return (
        <div className="login-page">
            <div className="form-wrapper">
                <h1 className="title">后台管理</h1>
                {
                    console.log(user)
                }
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
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
