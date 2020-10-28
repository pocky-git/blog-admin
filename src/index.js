import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import Router from './router'
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Router/>
        </HashRouter>
    </Provider>
,document.getElementById('root'))
