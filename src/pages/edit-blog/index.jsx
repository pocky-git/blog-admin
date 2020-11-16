import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import { Card, Form, Input, Button, Select } from 'antd'
import { connect } from 'react-redux'
import ReactMarkDown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import {  addBlog, updateBlog, resetUpdateBlog } from '../../redux/actions/blogAction'
import { getTag } from '../../redux/actions/tagsAction'
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
    state = {
        title: '', 
        tags: [], 
        description: '', 
        content: ''
    }

    formRef = React.createRef()

    onFinish = () => {
        const { updateBlog } = this.props.blog
        if (updateBlog._id) {
            this.props.updateBlog({ _id: updateBlog._id, ...this.state }, this)
        } else {
            this.props.addBlog(this.state, this)
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    beforeunload = ev => {
        console.log(ev)
        if (ev) {
        　　ev.returnValue = ''
        }
    }

    componentWillMount() {
        window.addEventListener('beforeunload', this.beforeunload)
        const {updateBlog} = this.props.blog
        if(updateBlog._id){
            const {title,tags,description,content} = updateBlog
            this.setState({
                title,tags,description,content
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener('beforeunload', this.beforeunload)
        this.props.resetUpdateBlog()
    }

    render() {
        const { title,tags,description,content } = this.state
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
                            initialValue={tags}
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
                            initialValue={title}
                        >
                            <Input onChange={e => this.handleChange('title', e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: '描述不能为空!' }]}
                            label='描述'
                            initialValue={description}
                        >
                            <Input onChange={e => this.handleChange('description', e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                label='内容'
                                rules={[{ required: true, message: '内容不能为空!' }]}
                                name="content"
                                initialValue={content}
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
                                    children={content}
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
                <Prompt 
                    when={true}
                    message={location => '信息还没保存，确定离开吗？'}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        tag: state.tag,
        blog: state.blog
    }),
    {  getTag, addBlog, updateBlog, resetUpdateBlog }
)(EditBlog)
