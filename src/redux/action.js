import {reqLogin} from '../api'
import {message} from 'antd'

import {SAVE_USER} from './action-type'

const saveUser = user => ({
    type: SAVE_USER,
    data: user
})

export const login = data => {
    return async dispatch => {
        const result = await reqLogin(data)
        if(result.data.code === 1){
            message.warn('用户名或密码错误!')
        }else if(result.data.code === 0){
            const user = result.data.data
            dispatch(saveUser(user))
        }
    }
}