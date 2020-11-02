import React, { Component } from 'react'
import { Card, Table, Input, Button, Space, Switch, Tag } from 'antd'
import {connect} from 'react-redux'

import { getBlog,getTag,setBlogTop } from '../../redux/action'
import getDate from '../../utils/getDate'
import './index.less'

const { Search } = Input

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
                    const tagName = tagsList.find(tag=>tag._id===tagId).name
                    return <Tag color="#2db7f5">{tagName}</Tag>
                })
            }
        },
        {
            title: '置顶',
            dataIndex: 'isTop',
            key: 'isTop',
            render: (isTop,blog) => (
                <Switch
                    defaultChecked={blog.isTop}
                    onChange={
                        isTop=>this.props.setBlogTop({blogId:blog._id,isTop})
                    }
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="primary">编辑</Button>
                    <Button type="danger">删除</Button>
                </Space>
            ),
        },
    ]

    componentDidMount(){
        this.props.getTag()
        this.props.getBlog()
    }

    render() {
        const {blogList,isLoading} = this.props.blog
        const dataSource = blogList.map(blog => ({
            ...blog, create_time: getDate(blog.create_time)
        })).sort((prevBlog, nextBlog) => Date.parse(nextBlog.create_time) - Date.parse(prevBlog.create_time))

        return (
            <div className='blog-page'>
                <Card
                    title={
                        <Search enterButton />
                    }
                    bordered={false}
                    extra={<Button type="primary" onClick={()=>this.props.history.push('/edit-blog')}>添加</Button>}
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
    {getBlog,getTag,setBlogTop}
)(Blog)