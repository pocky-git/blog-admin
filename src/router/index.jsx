import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'

import Login from '../pages/login'
import Main from '../pages/main'

export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/' component={Main}/>
            </Switch>
        )
    }
}
