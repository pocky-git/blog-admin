import React, { Component } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { connect } from 'react-redux'

import { addAbout, getAbout, updateAbout } from '../../redux/actions/aboutAction'
import Avantar from '../../components/avantar'

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
}

const tailLayout = {
    wrapperCol: { offset: 1, span: 23 },
}

class About extends Component {
    formRef = React.createRef()

    onFinish = values => {
        const { avantar, _id } = this.props.about
        if (!avantar) {
            return message.warn('请上传头像!')
        }
        if (_id) {
            this.props.updateAbout({ ...values, avantar, _id })
        } else {
            this.props.addAbout({ ...values, avantar })
        }
    }

    componentDidMount() {
        this.props.getAbout()
    }

    componentWillReceiveProps(props) {
        const { nickname, description, tags } = props.about
        this.formRef.current.setFieldsValue({
            nickname, description, tags
        })
    }

    render() {
        return (
            <Form
                {...layout}
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: '昵称不能为空!' }]}
                    label='昵称'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: '简介不能为空!' }]}
                    label='简介'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tags"
                    rules={[{ required: true, message: '标签不能为空!' }]}
                    label='标签'
                >
                    <Select
                        mode="tags"
                        size="default"
                    ></Select>
                </Form.Item>
                <Form.Item
                    name="avantar"
                    label='头像'
                >
                    <Avantar />
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(
    state => ({
        about: state.about
    }),
    { addAbout, getAbout, updateAbout }
)(About)
