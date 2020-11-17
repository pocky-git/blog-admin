import React from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { saveAbout } from '../../redux/actions/aboutAction'
import { connect } from 'react-redux'

import { IMG_BASE } from '../../config/constance'

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('图片格式错误!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片过大!')
    }
    return isJpgOrPng && isLt2M
}

class Avantar extends React.Component {
    state = {
        loading: false,
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === 'done') {
            const result = info.file.response
            if (result.code === 0) {
                const avantar = IMG_BASE + result.data
                this.props.saveAbout({ avantar })
                this.setState({
                    loading: false,
                })
            }
        }
    }

    render() {
        const { loading } = this.state
        const { avantar } = this.props.about
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
        return (
            <Upload
                name="avantar"
                listType="picture-card"
                showUploadList={false}
                action="/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {avantar ? <img src={avantar} alt="avantar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}

export default connect(
    state => ({
        about: state.about
    }),
    { saveAbout }
)(Avantar)