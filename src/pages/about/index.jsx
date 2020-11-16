import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'

import Avantar from '../../components/avantar'

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
}

const tailLayout = {
    wrapperCol: { offset: 1, span: 23 },
}

export default class About extends Component {
    state = {
        nickname: '',
        description: '',
        tags: []
    }

    avantarRef = React.createRef()

    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }

    onFinish = () => {
        const {nickname,description,tags} = this.state
        const avantar = this.avantarRef.current.state.imageUrl
        console.log(nickname,description,tags,avantar)
    }

    render() {
        const {nickname,description,tags} = this.state

        return (
            <Form
                {...layout}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: '昵称不能为空!' }]}
                    label='昵称'
                    initialValue={nickname}
                >
                    <Input onChange={e => this.handleChange('nickname', e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: '简介不能为空!' }]}
                    label='简介'
                    initialValue={description}
                >
                    <Input onChange={e => this.handleChange('description', e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="tags"
                    rules={[{ required: true, message: '标签不能为空!' }]}
                    label='标签'
                    initialValue={tags}
                >
                    <Select
                        mode="tags"
                        size="default"
                        onChange={val => this.handleChange('tags', val)}
                    ></Select>
                </Form.Item>
                <Form.Item
                    name="avantar"
                    label='头像'
                >
                    <Avantar ref={this.avantarRef}/>
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
