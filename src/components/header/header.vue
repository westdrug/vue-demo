<template>
  <header class="mint-header is-fixed">
    <div class="mint-header-button is-left">
      <slot name="logo"></slot>
      <a class="router-link-active" v-if="goBack" @click="$router.go(-1)">
        <button class="mint-button mint-button--default mint-button--normal">
          <span class="mint-button-icon">
            <i class="mintui mintui-back"></i>
          </span>
          <label class="mint-button-text">返回</label>
        </button>
      </a>
    </div>
    <h1 class="mint-header-title">
      <span v-if="headTitle">{{headTitle}}</span>
    </h1>
    <div class="mint-header-button is-right">
      <router-link :to="userInfo ? '/my' : '/login'" v-if="signinUp">
        <button class="mint-button mint-button--default mint-button--normal">
          <span class="mint-button-icon" v-if="userInfo">
            <img :src="userInfo.entity.avatar" :alt="userInfo.entity.nickname" class="user_avatar">
            <!--<svg class="user_avatar">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>-->
          </span>
          <label class="mint-button-text" v-else>登录/注册</label>
        </button>
      </router-link>
        <slot name="edit"></slot>
    </div>
  </header>

</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
    	data(){
            return{
            }
      },
      mounted() {
    		//获取用户信息
            /*if(this.userInfo && this.userInfo.entity.id) {
              this.getUserInfo()
            }*/
      },
      props: ['headTitle', 'goBack', 'signinUp'],
      computed: {
          ...mapState([
              'userInfo'
          ])
      },
      methods: {
          ...mapActions([
            'getUserInfo'
          ])
      }
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .user_avatar{
    @include wh(.9rem, .9rem);
    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 2rem;
  }
</style>
