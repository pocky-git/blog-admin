import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd'
import { connect } from 'react-redux'

import { changBlogInputData, getTag, addBlog } from '../../redux/action'
import './index.less'

const { Option } = Select

// import gfm from 'remark-gfm'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import ReactMarkDown from 'react-markdown'

// const renderers = {
//     code: ({ language, value }) => {
//         return <SyntaxHighlighter style={duotoneLight} language={language} children={value} />
//     }
// }

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
}

const tailLayout = {
    wrapperCol: { offset: 22, span: 2 },
}

class EditBlog extends Component {
    formRef = React.createRef()

    onFinish = () => {
        const {inputData} = this.props.blog
        this.props.addBlog(inputData)
        this.props.history.replace('/blog-list')
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
                        {...layout}
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
                        <Form.Item
                            name="content"
                            rules={[{ required: true, message: '内容不能为空!' }]}
                            label='内容'
                            initialValue={inputData.content}
                        >
                            <Input.TextArea rows={20} onChange={e => this.handleChange('content', e.target.value)} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" block>
                                提交
                            </Button>
                        </Form.Item>
                        {/* <ReactMarkDown renderers={renderers} plugins={[gfm]} escapeHtml={false} children={this.state.content}></ReactMarkDown> */}
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
    { changBlogInputData, getTag, addBlog }
)(EditBlog)
