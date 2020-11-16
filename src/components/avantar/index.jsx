import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {IMG_BASE} from '../../config/constance'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('图片格式错误!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片过大!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
    state = {
        imageUrl: '',
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const result = info.file.response
            if(result.code===0){
                const imageUrl = IMG_BASE + result.data
                this.setState({
                    imageUrl,
                    loading: false,
                })
            }
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="avantar"
                listType="picture-card"
                showUploadList={false}
                action="/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avantar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}