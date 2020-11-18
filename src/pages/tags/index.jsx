import React, { Component } from 'react'
import { 
    Card, 
    Table, 
    Space, 
    Button, 
    Modal, 
    Input, 
    message 
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import './index.less'
import {
    getTag,  
    addTag, 
    deleteTag, 
    updateTag,
    searchTag 
} from '../../redux/actions/tagsAction'
import {
    getBlog
} from '../../redux/actions/blogAction'
import getDate from '../../utils/getDate'

const { confirm } = Modal
const { Search } = Input

class Tags extends Component {
    state = {
        searchText: '',
        visible: false,
        name: ''
    }

    columns = [
        {
            title: '标签名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '操作',
            key: 'action',
            render: (tag) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => this.updateTag(tag)}>编辑</Button>
                    <Button type="danger" onClick={() => this.deleteTag(tag)}>删除</Button>
                </Space>
            ),
        },
    ]

    handleOk = () => {
        const { name } = this.state
        if (!name) {
            return message.warn('标签名不能为空!')
        }
        if (this.action === 'add') {
            this.props.addTag(name)
        } else if (this.action === 'update') {
            this.props.updateTag(this.id, name)
        }
        this.setState({
            visible: false,
            name: ''
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            name: ''
        })
    }

    deleteTag = (tag) => {
        const _this = this
        confirm({
            title: '确定删除吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const _id = tag._id
                _this.props.deleteTag(_id)
                _this.props.getBlog()
            }
        })
    }

    updateTag = (tag) => {
        this.action = 'update'
        this.setState({
            visible: true,
            name: tag.name
        })
        this.id = tag._id
    }

    onSearch = () => {
        const { searchText } = this.state
        if (!searchText) {
            return this.props.getTag()
        }
        this.props.searchTag(searchText)
    }

    render() {
        const { searchText, visible, name } = this.state
        const { isLoading, tagsList } = this.props.tag
        const dataSource = tagsList.map(tag => ({
            ...tag, create_time: getDate(tag.create_time)
        })).sort((prevTag, nextTag) => Date.parse(nextTag.create_time) - Date.parse(prevTag.create_time))

        return (
            <div className="tags-page">
                <Card
                    title={
                        <Search 
                            value={searchText} 
                            onChange={e => this.setState({searchText:e.target.value.trim()})} 
                            placeholder="输入标签名" 
                            onSearch={this.onSearch} 
                            enterButton 
                        />
                    }
                    bordered={false}
                    extra={<Button type="primary" onClick={() => {
                        this.action = 'add'
                        this.setState({visible: true})
                    }
                    }>添加</Button>}
                    style={{ width: '100%' }}
                    headStyle={{padding: 0}}
                    bodyStyle={{padding: 0}}
                >
                    <Table
                        style={{ width: '100%' }}
                        columns={this.columns}
                        dataSource={dataSource}
                        pagination={{
                            defaultPageSize: 8
                        }}
                        loading={isLoading}
                    />
                </Card>
                <Modal
                    title="编辑标签"
                    okText="确认"
                    cancelText="取消"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input value={name} onChange={e => this.setState({name: e.target.value.trim()})} placeholder="标签名称" />
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        tag: state.tag
    }),
    {
        addTag, 
        getTag, 
        deleteTag, 
        updateTag,
        searchTag,
        getBlog
    }
)(Tags)
