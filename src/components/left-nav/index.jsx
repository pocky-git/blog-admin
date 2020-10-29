import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'

import menu from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {
    constructor() {
        super()
        this.state = {
            openKeys: [],
        }
        this.openKeys = []
    }

    initMenu = (menu) => {
        return menu.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.path} icon={item.icon} title={item.text}>
                        {
                            this.initMenu(item.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path} icon={item.icon ? item.icon : null}>
                        <Link to={item.path}>{item.text}</Link>
                    </Menu.Item>
                )
            }
        })
    }

    initMenuStatus = (menu) => {
        const { pathname } = this.props.location
        menu.forEach((item,index) => {
            if (item.children) {
                this.openKeys.push(item.path)
                this.initMenuStatus(item.children)
            } else{
                if(item.path===pathname){
                    const {openKeys} = this.state
                    this.setState({
                        openKeys: Array.from(new Set([...openKeys,...this.openKeys]))
                    })
                    this.openKeys = []
                }else if(index===menu.length-1){
                    this.openKeys = []
                }
            }
        })
    }

    openChange = openKeys => {
        this.setState({
            openKeys
        })
    }
    
    componentWillMount = () => {
        this.menu = this.initMenu(menu)
        this.initMenuStatus(menu)
    }

    componentDidUpdate(prevProps){
        const oldPath = prevProps.location.pathname
        const newPath = this.props.location.pathname
        if(oldPath !== newPath){
            this.initMenuStatus(menu)
        }
    }

    render() {
        const { openKeys } = this.state

        return (
            <Menu 
                theme="dark" 
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.openChange}
                selectedKeys={[this.props.location.pathname]}
            >
                {this.menu}
            </Menu>
        )
    }
}

export default withRouter(LeftNav)
