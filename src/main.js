// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/index'
import {routerMode} from './config/env'
import './config/rem'
import Fastclick from 'fastclick'
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

/* 引入全部 Mint ui */
Vue.use(MintUI, {
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
  mode: routerMode
})

/*
 创建和挂载根实例
 从而让整个应用都有路由功能
*/
new Vue({
  router,
  store
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
