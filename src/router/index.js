import App from '../App'

//404
const notFound = r => require.ensure([], () => r(require('@/page/404/notFound')), 'notFound')
//首页
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
//选课
const list = r => require.ensure([], () => r(require('@/page/list/list')), 'list')
//课程详情
const info = r => require.ensure([], () => r(require('@/page/course-info/course-info')), 'info')
//登录
const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login')
//我的
const my = r => require.ensure([], () => r(require('@/page/my/index/index')), 'my')
//个人资料
const userInfo = r => require.ensure([], () => r(require('@/page/my/index/children/userInfo')), 'userInfo')
//修改姓名
const setNiceName = r => require.ensure([], () => r(require('@/page/my/index/children/children/setNiceName')), 'setNiceName')
//推广中心首页
const extendIndex = r => require.ensure([], () => r(require('@/page/my/extendCenter/index/index')), 'extend')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转首页
        {
            path: '',
            meta: {
                title: '首页'
            },
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            meta: {
                title: '首页'
            },
            component: home
        },
        //列表
        {
            path: '/list',
            meta: {
                title: '选课'
            },
            component: list
        },
        //详情
        {
            name: 'courseInfo',
            path: '/info',
            meta: {
                title: '详情'
            },
            component: info
        },
        //登录
        {
            path: '/login',
            meta: {
                title: '登录'
            },
            component: login
        },
        //我的
        {
            path: '/my',
            meta: {
                title: '我的',
                requireAuth: true             //状态 - 路由进入登录拦截
            },
            component: my,
            children: [
                //个人资料
                {
                    path: 'userInfo',
                    meta: {
                        title: '个人资料'
                    },
                    component: userInfo,
                    children: [
                        //修改名称
                        {
                            path: 'setNiceName',
                            meta: { title: '修改姓名' },
                            component:  setNiceName
                        }
                    ]
                }
            ]
        },
        //推广中心首页
        {
            path: 'extendIndex',
            meta: {
                title: '推广中心'
            },
            component: extendIndex
        },
        //404
        {
            path: "*",
            meta: {
                title: 'notFound'
            },
            redirect: "/notFound"
        }
    ]
}]
