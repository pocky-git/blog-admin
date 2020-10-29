import React, { Component } from 'react'
import {
    CloseOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'

import './index.less'

export default class Tabs extends Component {
    state = {
        pathArr: []
    }

    render() {
        return (
            <div className="old-path">
                <Link className="path-link">
                    测试<div className="close"><CloseOutlined /></div>
                </Link>
            </div>
        )
    }
}
