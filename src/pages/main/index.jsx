import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import { Redirect, Switch, Route } from 'react-router-dom'

import './index.less'
import { getUser,resetUser } from '../../redux/actions/userAction'
import { getTag } from '../../redux/actions/tagsAction'
import { getBlog } from '../../redux/actions/blogAction'
import { getAbout } from '../../redux/actions/aboutAction'
import Home from '../../pages/home'
import Blog from '../../pages/blog'
import EditBlog from '../../pages/edit-blog'
import Tags from '../../pages/tags'
import About from '../../pages/about'
import LeftNav from '../../components/left-nav'

const { Header, Sider, Content } = Layout

class Main extends Component {
    componentDidMount() {
        const _id = Cookie.get('_id')
        if (_id && !this.props.user._id) {
            this.props.getUser()
        }

        // 获取标签
        this.props.getTag()

        // 获取博客
        this.props.getBlog()
    }

    render() {
        // 如果没有_id 自动跳转到登陆界面
        const _id = Cookie.get('_id')
        if (!_id) {
            this.props.resetUser()
            return <Redirect to='login' />
        }

        return (
            <Layout className="main-page">
                <Sider>
                    <div className="logo">hello! {this.props.user.username}</div>
                    <LeftNav/>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/blog-list' component={Blog} />
                            <Route path='/edit-blog' component={EditBlog} />
                            <Route path='/tags' component={Tags} />
                            <Route path='/about' component={About} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    { getUser,resetUser,getTag,getBlog,getAbout }
)(Main)

