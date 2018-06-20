// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/index'
import {routerMode} from './config/env'
import './config/rem'
import {getStore, isNotEmpty} from './config/wUtils'
import Fastclick from 'fastclick'
import VueI18n from 'vue-i18n'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import defaultPic from './assets/default-pic.jpg'
import errorPic from './assets/error-pic.jpg'

if('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    Fastclick.attach(document.body);
  }, false)
}

/* 生产模式下给出的提示 */
Vue.config.productionTip = false;

/*国际化 挂载实例*/
Vue.use(VueI18n)

/*创建一个 i18n 实例对象，方便全局调用。通过 this.$i18n.locale 来进行语言的切换*/
//const langZh = r => require.ensure([], () => r(require('./config/lang/zh')), 'langZh')
//const langEn = r => require.ensure([], () => r(require('./config/lang/en')), 'langEn')
const i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
        'zh-CN': require('./config/lang/zh'),
        'en-US': require('./config/lang/en')
    }
})


/* 引入全部 Mint ui */
Vue.use(MintUI, {
    //懒加载
    lazyload: {
        preLoad: 1.3,
        error: errorPic,
        loading: defaultPic,
        attempt: 1
    }
})

/* 注册路由中间件 */
Vue.use(VueRouter)
/*创建 router 实例，然后传 `routes` 配置*/
const router = new VueRouter({
    routes,
    mode: routerMode,         //build 时需要注释掉
    //base: '/w/'             //build 后线上根目录下子目录
})

/*
 创建和挂载根实例
 从而让整个应用都有路由功能
*/
new Vue({
    router,
    store,
    i18n,
    created() {
        if(isNotEmpty(getStore('userInfo'))) {
            store.state.userInfo = JSON.parse(getStore('userInfo'))
            store.state.login = JSON.parse(getStore('userInfo')).success ? true : false
        }
    }
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.title){
    document.title = to.meta.title
  }
  if(to.meta.requireAuth) {                                    //进入是否需要此下的权限
      if(store.state.login && store.state.userInfo) {         //vuex -> login状态判断
          next()
      } else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}                // 将跳转的路由path作为参数，登录成功后重定向到该路由
          })
      }
  } else {
      next()
  }
})
