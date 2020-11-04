import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd'
import { connect } from 'react-redux'
import ReactMarkDown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { changBlogInputData, getTag, addBlog, updateBlog, resetBlogInputData } from '../../redux/action'
import './index.less'

const { Option } = Select

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={dark} language={language} children={value} />
    }
}

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
}

class EditBlog extends Component {
    formRef = React.createRef()

    onFinish = () => {
        const { updateBlog, inputData } = this.props.blog
        if (updateBlog._id) {
            this.props.updateBlog({ _id: updateBlog._id, ...inputData }, this)
        } else {
            this.props.addBlog(inputData, this)
        }
    }

    handleChange = (name, value) => {
        this.props.changBlogInputData({
            [name]: value
        })
    }

    componentDidMount() {
        this.props.getTag()
    }

    render() {
        const { inputData } = this.props.blog
        const { tagsList } = this.props.tag
        return (
            <div className="edit-blog-page">
                <Card title='编辑博客'>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="tags"
                            label="标签"
                            rules={[{ required: true, message: '请选择标签!' }]}
                            initialValue={inputData.tags}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                onChange={value => this.handleChange('tags', value)}
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
                            initialValue={inputData.title}
                        >
                            <Input onChange={e => this.handleChange('title', e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                label='内容'
                                rules={[{ required: true, message: '内容不能为空!' }]}
                                name="content"
                                initialValue={inputData.content}
                            >
                                <Input.TextArea rows={20} onChange={e => this.handleChange('content', e.target.value)} />
                            </Form.Item>
                            <Card 
                                title='预览'
                                className="markdown-box"
                            >
                                <ReactMarkDown
                                    renderers={renderers}
                                    plugins={[gfm]}
                                    escapeHtml={false}
                                    children={inputData.content}
                                ></ReactMarkDown>
                            </Card>
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({
        tag: state.tag,
        blog: state.blog
    }),
    { changBlogInputData, getTag, addBlog, updateBlog, resetBlogInputData }
)(EditBlog)
