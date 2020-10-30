import {reqLogin,reqUser,reqAddTag,reqGetTag,reqDeleteTag,reqUpdateTag,reqSearchTag} from '../api'
import {message} from 'antd'

import {SAVE_USER,CHANGE_TAG_INPUTDATA,SAVE_TAG,SET_VISIBLE,RESET_TAG_INPUTDATA,SET_LOADING,CHANGE_SEARCHTEXT} from './action-type'

// 保存用户信息
const saveUser = user => ({
    type: SAVE_USER,
    data: user
})

// 登录
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

// 自动登录 获取用户信息
export const getUser = () => {
    return async dispatch => {
        const result = await reqUser()
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 0){
            const user = result.data.data
            dispatch(saveUser(user))
        }
    }
}



// 改变标签输入框的值
export const changTagInputData = data => ({
    type: CHANGE_TAG_INPUTDATA,
    data
})

// 清空标签输入框的值
export const resetTagInputData = () => ({
    type: RESET_TAG_INPUTDATA
})

// 保存标签同步action
export const saveTag = tags => ({
    type: SAVE_TAG,
    data: tags
})

// 设置输入框显示隐藏同步action
export const setVisible = isShow => ({
    type: SET_VISIBLE,
    data: isShow
})

// 设置表格loading状态同步action
export const setLoading = isLoading => ({
    type: SET_LOADING,
    data: isLoading
})

// 设置搜索框的值
export const changeSearchText = val => ({
    type: CHANGE_SEARCHTEXT,
    data: val
})

// 添加标签异步action
export const addTag = data => {
    return async dispatch => {
        const result = await reqAddTag(data)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('添加失败!')
        }else if(result.data.code === 2){
            message.warn('标签已存在!')
        }else if(result.data.code === 0){
            dispatch(setVisible(false))
            dispatch(getTag())
            message.success('添加成功!')
        }
        dispatch(resetTagInputData())
    }
}

//获取全部标签异步action
export const getTag = () => {
    return async dispatch => {
        dispatch(setLoading(true))
        const result = await reqGetTag()
        dispatch(setLoading(false))
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('获取标签失败!')
        }else if(result.data.code === 0){
            const tags = result.data.data
            dispatch(saveTag(tags))
        }
    }
}

//删除标签异步action
export const deleteTag = id => {
    return async dispatch => {
        const result = await reqDeleteTag(id)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('删除标签失败!')
        }else if(result.data.code === 2){
            message.warn('标签不存在!')
        }else if(result.data.code === 0){
            dispatch(getTag())
            message.success('删除成功!')
        }
    }
}

//更新标签异步action
export const updateTag = (id,name) => {
    return async dispatch => {
        const result = await reqUpdateTag(id,name)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('更新标签失败!')
        }else if(result.data.code === 2){
            message.warn('标签不存在!')
        }else if(result.data.code === 3){
            message.warn('标签已存在!')
        }else if(result.data.code === 0){
            dispatch(setVisible(false))
            dispatch(getTag())
            message.success('更新成功!')
        }
        dispatch(resetTagInputData())
    }
}

//搜索标签异步action
export const searchTag = searchText => {
    return async dispatch => {
        const result = await reqSearchTag(searchText)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('搜索失败!')
        }else if(result.data.code === 0){
            const tags = result.data.data
            dispatch(saveTag(tags))
        }
    }
}