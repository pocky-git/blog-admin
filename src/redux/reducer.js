import {combineReducers} from 'redux'

import {
    SAVE_USER,
    CHANGE_TAG_INPUTDATA,
    SAVE_TAG,SET_VISIBLE,
    RESET_TAG_INPUTDATA,
    SET_LOADING,
    CHANGE_SEARCHTEXT,
    CHANGE_BLOG_INPUTDATA,
    RESET_BLOG_INPUTDATA,
    SAVE_BLOG
} from './action-type'

// 用户reducer
const initUser = {
    username: ''
}

function user(state=initUser,action){
    switch(action.type){
        case SAVE_USER:
            return Object.assign({},initUser,action.data)
        default:
            return state
    }
}


// 标签reducer
const initTag = {
    visible: false,
    isLoading: false,
    inputData: {},
    tagsList: [],
    searchText: ''
}

function tag(state=initTag,action){
    switch(action.type){
        case CHANGE_TAG_INPUTDATA:
            return {...state,inputData: {...state.inputData,...action.data}}
        case RESET_TAG_INPUTDATA:
            return {...state,inputData: {}}
        case SAVE_TAG:
            return {...state,tagsList: action.data}
        case SET_VISIBLE:
            return {...state,visible: action.data}
        case SET_LOADING:
            return {...state,isLoading: action.data}
        case CHANGE_SEARCHTEXT:
            return {...state,searchText: action.data}
        default:
            return state
    }
}

// 博客reducer
const initBlog = {
    inputData: {},
    blogList: [],
    isLoading: false,
}

function blog(state=initBlog,action){
    switch(action.type){
        case CHANGE_BLOG_INPUTDATA:
            return {...state,inputData:{...state.inputData,...action.data}}
        case RESET_BLOG_INPUTDATA:
            return {...state,inputData:{}}
        case SAVE_BLOG:
            return {...state,blogList:action.data}
        case SET_LOADING:
            return {...state,isLoading: action.data}
        default:
            return state
    }
}

export default combineReducers({
    user,tag,blog
})