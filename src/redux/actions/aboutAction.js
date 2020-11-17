import {message} from 'antd'

import {
    reqAddAbout,
    reqGetAbout,
    reqUpdateAbout
} from '../../api'
import {
    SAVE_ABOUT
} from '../action-type'

export const saveAbout = about => ({
    type: SAVE_ABOUT,
    data: about
})

export const getAbout = () => {
    return async dispatch => {
        const result = await reqGetAbout()
        if(result.data.code === 500){
            message.warn('获取关于我们失败!')
        }else if(result.data.code === 0){
            const about = result.data.data
            dispatch(saveAbout(about))
        }
    }
}

export const addAbout = about => {
    return async dispatch => {
        const result = await reqAddAbout(about)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('添加失败!')
        }else if(result.data.code === 0){
            const about = result.data.data
            message.success('添加成功!')
            dispatch(saveAbout(about))
        }
    }
}

export const updateAbout = about => {
    return async dispatch => {
        const result = await reqUpdateAbout(about)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('更新失败!')
        }else if(result.data.code === 0){
            const about = result.data.data
            message.success('更新成功!')
            dispatch(saveAbout(about))
        }
    }
}