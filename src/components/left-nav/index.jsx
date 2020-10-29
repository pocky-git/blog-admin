import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'

import menu from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {
    constructor() {
        super()
        this.state = {
            defaultOpenKeys: []
        }
        this.defaultOpenKeys = []
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
                this.defaultOpenKeys.push(item.path)
                this.initMenuStatus(item.children)
            } else{
                if(item.path===pathname){
                    this.setState({
                        defaultOpenKeys: this.defaultOpenKeys
                    })
                    this.defaultOpenKeys = []
                }else if(index===menu.length-1){
                    this.defaultOpenKeys = []
                }
            }
        })
    }
    
    componentWillMount = () => {
        this.menu = this.initMenu(menu)
        this.initMenuStatus(menu)
    }

    render() {
        const { defaultOpenKeys } = this.state

        return (
            <Menu 
                theme="dark" 
                mode="inline" 
                defaultOpenKeys={defaultOpenKeys} 
                selectedKeys={[this.props.location.pathname]}
            >
                {this.menu}
            </Menu>
        )
    }
}

export default withRouter(LeftNav)
