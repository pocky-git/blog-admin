import React, { Component } from 'react'
import { Card, Table, Input, Button, Space, Switch, Tag, Modal } from 'antd'
import {connect} from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { getBlog,getTag,setBlogTop,deleteBlog,changeSearchText,searchBlog,saveUpdateBlog,resetUpdateBlog,resetBlogInputData,changBlogInputData } from '../../redux/action'
import getDate from '../../utils/getDate'
import './index.less'

const { Search } = Input
const { confirm } = Modal

class Blog extends Component {
    columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => {
                const {tagsList} = this.props.tag
                return tags.map(tagId=>{
                    const tagObj = tagsList.find(tag=>tag._id===tagId)
                    if(tagObj){
                        return <Tag color="#2db7f5">{tagObj.name}</Tag>
                    }
                })
            }
        },
        {
            title: '置顶',
            dataIndex: 'isTop',
            key: 'isTop',
            render: (isTop,blog) => (
                <Switch
                    checked={isTop}
                    onChange={
                        isTop=>this.props.setBlogTop({blogId:blog._id,isTop})
                    }
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            render: blog => (
                <Space size="middle">
                    <Button type="primary" onClick={()=>{
                        const { title, tags, content } = blog
                        this.props.saveUpdateBlog(blog)
                        this.props.changBlogInputData({ title, tags, content })
                        //this.formRef.current.setFieldsValue({ title, tags, content })
                        this.props.history.push('/edit-blog')
                    }}>编辑</Button>
                    <Button type="danger" onClick={()=>this.deleteBlog(blog._id)}>删除</Button>
                </Space>
            ),
        },
    ]

    deleteBlog = blogId => {
        const _this = this
        confirm({
            title: '确定删除吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.props.deleteBlog(blogId)
            }
        })
    }

    onSearch = () => {
        const { searchText } = this.props.blog
        if (!searchText) {
            return this.props.getBlog()
        }
        this.props.searchBlog(searchText)
    }

    componentDidMount(){
        this.props.getTag()
        this.props.getBlog()
    }

    render() {
        const {blogList,isLoading,searchText} = this.props.blog
        const dataSource = blogList.map(blog => ({
            ...blog, create_time: getDate(blog.create_time)
        })).sort((prevBlog, nextBlog) => Date.parse(nextBlog.create_time) - Date.parse(prevBlog.create_time))

        return (
            <div className='blog-page'>
                <Card
                    title={
                        <Search value={searchText} onChange={e => this.props.changeSearchText(e.target.value.trim())} placeholder="输入标签名" onSearch={this.onSearch} enterButton />
                    }
                    bordered={false}
                    extra={<Button type="primary" onClick={()=>{
                        this.props.resetBlogInputData()
                        this.props.resetUpdateBlog()
                        this.props.history.push('/edit-blog')
                    }}>添加</Button>}
                    style={{ width: '100%' }}
                >
                    <Table
                        style={{ width: '100%' }}
                        pagination={{
                            defaultPageSize: 8
                        }}
                        columns={this.columns}
                        dataSource={dataSource}
                        loading={isLoading}
                    />
                </Card>
            </div>
        )
    }
}

export default connect(
    state=>({
        tag: state.tag,
        blog: state.blog
    }),
    {getBlog,getTag,setBlogTop,deleteBlog,changeSearchText,searchBlog,saveUpdateBlog,resetUpdateBlog,resetBlogInputData,changBlogInputData}
)(Blog)