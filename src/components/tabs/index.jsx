import React, { Component } from 'react'
import {
    CloseOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import menu from '../../config/menuConfig'
import './index.less'

class Tabs extends Component {
    state = {
        pathArr: []
    }

    getText = (menu) => {
        const { pathname } = this.props.location
        menu.forEach(item => {
            if (pathname === item.path) {
                this.text = item.text
            } else if (item.children) {
                this.getText(item.children)
            }
        })
    }

    getPathArr = () => {
        const { pathArr } = this.state
        const { pathname } = this.props.location
        const index = pathArr.findIndex(path => path.pathname === pathname)
        if (index === -1) {
            this.getText(menu)
            const path = {
                text: this.text,
                pathname
            }
            pathArr.push(path)
            this.setState({
                pathArr
            })
        }
    }

    closePath = (e, pathname) => {
        e.stopPropagation()
        const { pathArr } = this.state
        const index = pathArr.findIndex(path => path.pathname === pathname)
        
        if (pathname === this.props.location.pathname && pathArr.length != 1) {
            if (index === pathArr.length-1) {
                this.props.history.replace(pathArr[index - 1].pathname)
            } else {
                this.props.history.replace(pathArr[index + 1].pathname)
            }
        } else if (pathname === this.props.location.pathname && pathArr.length == 1) {
            this.props.history.replace('/')
        }

        pathArr.splice(index, 1)
        this.setState({
            pathArr
        })
    }

    componentDidMount() {
        this.getPathArr()
    }

    componentDidUpdate(preProps) {
        const oldPath = preProps.location.pathname
        const newPath = this.props.location.pathname
        if (oldPath !== newPath) {
            this.getPathArr()
        }
    }

    render() {
        const { pathArr } = this.state
        const { pathname } = this.props.location

        return (
            <div className="old-path">
                {
                    pathArr.map((path, index) => (
                        <div key={index} className={pathname === path.pathname ? "path-link active" : "path-link"}>
                            <Link to={path.pathname}>{path.text}</Link>
                            {
                                pathArr.length === 1 && path.pathname === '/' ?
                                <div className="close hide" onClick={(e) => this.closePath(e, path.pathname)}><CloseOutlined /></div> :
                                    <div className="close" onClick={(e) => this.closePath(e, path.pathname)}><CloseOutlined /></div>
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default withRouter(Tabs)
