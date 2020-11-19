import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { connect } from 'react-redux'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import Markdown from 'braft-extensions/dist/markdown'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import { addBlog, updateBlog, resetUpdateBlog } from '../../redux/actions/blogAction'
import { getTag } from '../../redux/actions/tagsAction'
import './index.less'

const { Option } = Select

const options = {
    syntaxs: [
        {
            name: 'JavaScript',
            syntax: 'javascript'
        },
        {
            name: 'HTML',
            syntax: 'html'
        },
        {
            name: 'CSS',
            syntax: 'css'
        }
    ]
}

BraftEditor.use(CodeHighlighter(options))
BraftEditor.use(Markdown())

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
}

const tailLayout = {
    wrapperCol: { offset: 1, span: 23 },
}

class EditBlog extends Component {
    formRef = React.createRef()

    onFinish = values => {
        const { updateBlog } = this.props.blog
        if (updateBlog._id) {
            this.props.updateBlog({ 
                _id: updateBlog._id, 
                ...values,
                content: values.content.toHTML()
            }, this)
        } else {
            this.props.addBlog({
                ...values,
                content: values.content.toHTML()
            }, this)
        }
    }

    beforeunload = ev => {
        if (ev) {
            ev.returnValue = ''
        }
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload)
        const { updateBlog } = this.props.blog
        if (updateBlog._id) {
            const { title, tags, description, content } = updateBlog
            this.formRef.current.setFieldsValue({
                title, 
                tags, 
                description,
                content:BraftEditor.createEditorState(content)
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload)
        this.props.resetUpdateBlog()
    }

    render() {
        const { tagsList } = this.props.tag

        return (
            <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                {...layout}
            >
                <Form.Item
                    name="tags"
                    label="标签"
                    rules={[{ required: true, message: '请选择标签!' }]} 
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                    >
                        {
                            tagsList.map(tag => (
                                <Option key={tag._id}>{tag.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: '标题不能为空!' }]}
                    label='标题'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: '描述不能为空!' }]}
                    label='描述'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label='内容'
                    rules={[{ required: true, message: '内容不能为空!' }]}
                >
                    <BraftEditor/>
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
        tag: state.tag,
        blog: state.blog
    }),
    { getTag, addBlog, updateBlog, resetUpdateBlog }
)(EditBlog)
