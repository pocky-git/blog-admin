import axios from 'axios'

export const reqLogin = ({username,password}) => axios.post('/login',{username,password})