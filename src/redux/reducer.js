import {combineReducers} from 'redux'

import {SAVE_USER} from './action-type'

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

export default combineReducers({
    user
})