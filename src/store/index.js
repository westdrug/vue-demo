import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userInfo: null,            //用户信息
    login: false,              //是否登录
    userExtendInfo: null,      //推广员信息
    isExtender: false,         //是否推广员
    classDetail: null,         //班级详情
    classTopicDetail: null,    //话题详情
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
