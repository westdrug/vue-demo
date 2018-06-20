import {
    RECODE_USERINFO,
    GET_USERINFO,
    RESET_NAME,
    OUT_LOGIN,
    USER_EXTEND_STATE,
    RESET_CLASS_DETAIL,
    RESET_CLASS_TOPICINFO
} from './mutation-type'
import { getStore, removeStore } from '@/config/wUtils'

export default {
    //记录用户信息
    [RECODE_USERINFO](state, info) {
        state.userInfo = info || getStore('userInfo')
        state.login = state.userInfo.success ? true : false
        let validity = 30,
            now = new Date()
        now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
        document.cookie = "USERID=" + info.entity.id + ";expires=" + now.toGMTString()
        document.cookie = "SID=39CF07AFB69293D61CC5DEC49607D995" + ";expires=" + now.toGMTString()
    },
    //获取用户信息 存入vuex
    [GET_USERINFO](state, info) {
        if(state.userInfo && !state.login && state.userInfo.entity.nickname !== info.entity.nickname) return
        if(info.success) {
            state.userInfo = {...info}
            let validity = 30,
                now = new Date()
            now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
            document.cookie = "USERID=" + info.entity.id + ";expires=" + now.toGMTString()
            document.cookie = "SID=39CF07AFB69293D61CC5DEC49607D995" + ";expires=" + now.toGMTString()
        } else {
            state.userInfo = null
        }
    },
    //修改姓名
    [RESET_NAME](state, realName) {
        state.userInfo.entity = Object.assign({}, state.userInfo.entity, {realName})
    },
    //退出登录
    [OUT_LOGIN](state) {
        state.userInfo = null
        state.login = false
        removeStore('userInfo')
    },
    //存入班级信息，减少请求
    [RESET_CLASS_DETAIL](state, detail) {
        state.classDetail = detail
    },
    // 存入当前话题详情
    [RESET_CLASS_TOPICINFO](state, info) {
      state.classTopicDetail = info
    },
    //推广员状态
    [USER_EXTEND_STATE](state, info) {
        state.userExtendInfo = info
        state.isExtender = info.entity.isContinue
    }
}
