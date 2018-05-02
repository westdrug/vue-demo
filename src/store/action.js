import {
  getUserInfo
} from '../service/getData'

import {
  GET_USERINFO
} from './mutation-type'

export default {
  async getUserInfo({
     commit,
     state
  }) {
     let userId = state.userInfo.entity.id,
         res = await getUserInfo(userId).then(res => {
            return res
         })
         commit(GET_USERINFO, res)
  }
}
