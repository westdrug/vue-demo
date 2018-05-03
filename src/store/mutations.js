import {
  RECODE_USERINFO,
  GET_USERINFO,
  OUT_LOGIN,
  USER_EXTEND_STATE
} from './mutation-type'

export default {
    //记录用户信息
    [RECODE_USERINFO](state, info) {
        state.userInfo = info
        state.login = true
        let validity = 30,
            now = new Date()
        now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
        document.cookie = "USERID=" + info.entity.id + ";expires=" + now.toGMTString()
        document.cookie = "SID=39CF07AFB69293D61CC5DEC49607D995" + ";expires=" + now.toGMTString()
    },
    //获取用户信息 存入vuex
    [GET_USERINFO](state, info) {
        if(state.userInfo && state.userInfo.entity.nickname !== info.entity.nickname) return
        if(!state.login) return
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
    //退出登录
    [OUT_LOGIN](state) {
        state.userInfo = null
        state.login = false
    },
    //推广员状态
    [USER_EXTEND_STATE](state, info) {
        state.userExtendInfo = info
        state.isExtender = info.entity.isContinue
    }
}
