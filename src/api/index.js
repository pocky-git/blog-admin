import axios from 'axios'

// 登录接口
export const reqLogin = ({username,password}) => axios.post('/login',{username,password})

// 自动登录接口
export const reqUser = () => axios.get('/user')