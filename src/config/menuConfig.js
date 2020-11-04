import {
    TagsOutlined,
    FormOutlined,
    UserOutlined,
    SmileOutlined,
} from '@ant-design/icons'

export default [
    {
        text: '首页',
        path: '/',
        icon: <FormOutlined />,
    },
    {
        text: '博客',
        path: '/blog',
        icon: <FormOutlined />,
        children: [
            {
                text: '博客列表',
                path: '/blog-list',
            },
            {
                text: '编辑博客',
                path: '/edit-blog'
            },
        ]
    },
    {
        text: '标签',
        path: '/tags',
        icon: <TagsOutlined />,
    },
    {
        text: '关于我',
        icon: <UserOutlined />,
        path: '/about'
    },
]