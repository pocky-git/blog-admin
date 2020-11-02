import React, { Component } from 'react'
import { Card, Table, Space, Button, Modal, Input, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

import './index.less'
import { changTagInputData, getTag, setVisible, addTag, deleteTag, updateTag, saveTag, resetTagInputData, changeSearchText, searchTag } from '../../redux/action'
import getDate from '../../utils/getDate'

const { confirm } = Modal
const { Search } = Input

class Tags extends Component {
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

    handleChange = (name, val) => {
        this.props.changTagInputData({
            [name]: val.trim()
        })
    }

    handleOk = () => {
        const { inputData } = this.props.tag
        if (!inputData.name) {
            return message.warn('标签名不能为空!')
        }
        if (this.action === 'add') {
            this.props.addTag(inputData)
        } else if (this.action === 'update') {
            const _this = this
            confirm({
                title: '确定更新吗?',
                icon: <ExclamationCircleOutlined />,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    _this.props.updateTag(_this.id, inputData.name)
                }
            })
        }
    }

    handleCancel = () => {
        this.props.setVisible(false)
        this.props.resetTagInputData()
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
            }
        })
    }

    updateTag = (tag) => {
        this.action = 'update'
        this.props.setVisible(true)
        this.props.changTagInputData({
            name: tag.name
        })
        this.id = tag._id
    }

    onSearch = () => {
        const { searchText } = this.props.tag
        if (!searchText) {
            return this.props.getTag()
        }
        this.props.searchTag(searchText)
    }

    componentDidMount() {
        this.props.getTag()
    }

    render() {
        const { visible, isLoading, inputData, tagsList, searchText } = this.props.tag
        const dataSource = tagsList.map(tag => ({
            ...tag, create_time: getDate(tag.create_time)
        })).sort((prevTag, nextTag) => Date.parse(nextTag.create_time) - Date.parse(prevTag.create_time))

        return (
            <div className="tags-page">
                <Card
                    title={
                        <Search value={searchText} onChange={e => this.props.changeSearchText(e.target.value.trim())} placeholder="输入标签名" onSearch={this.onSearch} enterButton />
                    }
                    bordered={false}
                    extra={<Button type="primary" onClick={() => {
                        this.action = 'add'
                        this.props.setVisible(true)
                    }
                    }>添加</Button>}
                    style={{ width: '100%' }}
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
                    <Input value={inputData.name} onChange={e => this.handleChange('name', e.target.value)} placeholder="标签名称" />
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        tag: state.tag
    }),
    { changTagInputData, addTag, setVisible, getTag, deleteTag, updateTag, saveTag, resetTagInputData, changeSearchText, searchTag }
)(Tags)
