import {
    reqAddTag,
    reqGetTag,
    reqDeleteTag,
    reqUpdateTag,
    reqSearchTag,
} from '../../api'
import {message} from 'antd'

import {
    SAVE_TAG,
    SET_LOADING,
} from '../action-type'

// 保存标签同步action
export const saveTag = tags => ({
    type: SAVE_TAG,
    data: tags
})

// 设置表格loading状态同步action
export const setLoading = isLoading => ({
    type: SET_LOADING,
    data: isLoading
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
            dispatch(getTag())
            message.success('添加成功!')
        }
    }
}

//获取全部标签异步action
export const getTag = () => {
    return async dispatch => {
        dispatch(setLoading(true))
        const result = await reqGetTag()
        dispatch(setLoading(false))
        if(result.data.code === 500){
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
            dispatch(getTag())
            message.success('更新成功!')
        }
    }
}

//搜索标签异步action
export const searchTag = searchText => {
    return async dispatch => {
        dispatch(setLoading(true))
        const result = await reqSearchTag(searchText)
        dispatch(setLoading(false))
        if(result.data.code === 500){
            message.warn('搜索失败!')
        }else if(result.data.code === 0){
            const tags = result.data.data
            dispatch(saveTag(tags))
        }
    }
}