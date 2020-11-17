import {combineReducers} from 'redux'

import {
    SAVE_USER,
    RESET_USER,
    SAVE_TAG,
    SET_LOADING,
    SAVE_BLOG,
    SAVE_UPDATE_BLOG,
    RESET_UPDATE_BLOG,
    SAVE_ABOUT
} from './action-type'

// 用户reducer
const initUser = {
    username: ''
}

function user(state=initUser,action){
    switch(action.type){
        case SAVE_USER:
            return Object.assign({},initUser,action.data)
        case RESET_USER:
            return {username: ''}
        default:
            return state
    }
}


// 标签reducer
const initTag = {
    isLoading: false,
    tagsList: [],
}

function tag(state=initTag,action){
    switch(action.type){
        case SAVE_TAG:
            return {...state,tagsList: action.data}
        case SET_LOADING:
            return {...state,isLoading: action.data}
        default:
            return state
    }
}

// 博客reducer
const initBlog = {
    blogList: [],
    isLoading: false,
    updateBlog: {}
}

function blog(state=initBlog,action){
    switch(action.type){
        case SAVE_BLOG:
            return {...state,blogList:action.data}
        case SET_LOADING:
            return {...state,isLoading: action.data}
        case SAVE_UPDATE_BLOG:
            return {...state,updateBlog:action.data}
        case RESET_UPDATE_BLOG:
            return {...state,updateBlog:{}}
        default:
            return state
    }
}

// 关于我们reducer
const initAbout = {
    nickname: '',
    tags: [],
    description: '',
    avantar: ''
}

function about(state=initAbout,action){
    switch(action.type){
        case SAVE_ABOUT:
            return {...state,...action.data}
        default:
            return state
    }
}

export default combineReducers({
    user,tag,blog,about
})