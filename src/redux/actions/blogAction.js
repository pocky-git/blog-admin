import {
    reqAddBlog,
    reqGetBlog,
    reqSetBlogTop,
    reqDeleteBlog,
    reqSearchBlog,
    reqUpdateBlog
} from '../../api'
import {message} from 'antd'

import {
    SAVE_BLOG,
    SAVE_UPDATE_BLOG,
    RESET_UPDATE_BLOG,
    SET_LOADING,
} from '../action-type'

// 保存博客列表同步action
export const saveBlog = blogs => ({
    type: SAVE_BLOG,
    data: blogs
})

// 保存将要更新的博客
export const saveUpdateBlog = blog =>({
    type: SAVE_UPDATE_BLOG,
    data: blog
})

// 清空将要更新的博客
export const resetUpdateBlog = () =>({
    type: RESET_UPDATE_BLOG,
})

// 设置表格loading状态同步action
export const setLoading = isLoading => ({
    type: SET_LOADING,
    data: isLoading
})

// 添加博客异步action
export const addBlog = (blog,_this) => {
    return async dispatch => {
        const result = await reqAddBlog(blog)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('添加失败!')
        }else if(result.data.code === 0){
            message.success('添加成功!')
            _this.props.history.replace('/blog-list')
            dispatch(getBlog())
        }
    }
}

// 获取博客异步action
export const getBlog = () => {
    return async dispatch => {
        dispatch(setLoading(true))
        const result = await reqGetBlog()
        dispatch(setLoading(false))
        if(result.data.code === 500){
            message.warn('获取失败!')
        }else if(result.data.code === 0){
            const blogs = result.data.data
            dispatch(saveBlog(blogs))
        }
    }
}

// 设置博客置顶
export const setBlogTop = data => {
    return async dispatch => {
        const result = await reqSetBlogTop(data)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('置顶失败!')
        }else if(result.data.code === 2){
            message.warn('博客不存在!')
        }else if(result.data.code === 0){
            dispatch(getBlog())
        }
    }
}

//删除博客异步action
export const deleteBlog = blogId => {
    return async dispatch => {
        const result = await reqDeleteBlog(blogId)
        if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 500){
            message.warn('删除标签失败!')
        }else if(result.data.code === 2){
            message.warn('博客不存在!')
        }else if(result.data.code === 0){
            dispatch(getBlog())
            message.success('删除成功!')
        }
    }
}

//搜索博客异步action
export const searchBlog = searchText => {
    return async dispatch => {
        dispatch(setLoading(true))
        const result = await reqSearchBlog(searchText)
        dispatch(setLoading(false))
        if(result.data.code === 500){
            message.warn('搜索失败!')
        }else if(result.data.code === 0){
            const blogs = result.data.data
            dispatch(saveBlog(blogs))
        }
    }
}

//更新博客异步action
export const updateBlog = (blog,_this) => {
    return async dispatch => {
        const result = await reqUpdateBlog(blog)
        if(result.data.code === 500){
            message.warn('更新失败!')
        }else if(result.data.code === 1){
            message.warn('请先登录!')
        }else if(result.data.code === 0){
            message.success('更新成功!')
             _this.props.history.replace('/blog-list')
            dispatch(getBlog())
        }
    }
}