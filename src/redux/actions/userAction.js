import {
    reqLogin,
    reqUser,
} from '../../api'
import {message} from 'antd'
import Cookie from 'js-cookie'

import {
    SAVE_USER,
    RESET_USER,
} from '../action-type'

// 保存用户信息
const saveUser = user => ({
    type: SAVE_USER,
    data: user
})

//清空用户信息
export const resetUser = () => ({
    type: RESET_USER
})

// 登录
export const login = data => {
    return async dispatch => {
        const result = await reqLogin(data)
        if(result.data.code === 1){
            message.warn('用户名或密码错误!')
        }else if(result.data.code === 0){
            message.success('登录成功!')
            const user = result.data.data
            dispatch(saveUser(user))
        }
    }
}

// 自动登录 获取用户信息
export const getUser = () => {
    return async dispatch => {
        const result = await reqUser()
        if(result.data.code === 1){
            message.warn('请先登录!')
            Cookie.remove('_id')
            dispatch(resetUser())
        }else if(result.data.code === 0){
            const user = result.data.data
            dispatch(saveUser(user))
        }
    }
}