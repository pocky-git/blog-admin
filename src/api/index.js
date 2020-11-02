import axios from 'axios'

// 登录接口
export const reqLogin = ({username,password}) => axios.post('/login',{username,password})

// 自动登录接口
export const reqUser = () => axios.get('/user')

// 添加标签接口
export const reqAddTag = ({name}) => axios.post('/addTag',{name})

// 获取标签接口
export const reqGetTag = () => axios.get('/getTag')

// 删除标签接口
export const reqDeleteTag = id => axios.post('/deleteTag',{id})

// 更新标签接口
export const reqUpdateTag = (id,name) => axios.post('/updateTag',{id,name})

// 搜索标签接口
export const reqSearchTag = searchText => axios.get('/searchTag',{params:{searchText}})

// 添加博客接口
export const reqAddBlog = blog => axios.post('/addBlog',blog)

// 获取博客接口
export const reqGetBlog = () => axios.get('/getBlog')

// 设置博客置顶
export const reqSetBlogTop = data => axios.post('/setBlogTop',data)