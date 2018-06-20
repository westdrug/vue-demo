<template>
  <header class="mint-header is-fixed" :class="{extendHead: isExtend, whiteHead: isWhite}">
    <div class="mint-header-button is-left" v-if="!unSearchFlag">
        <slot name="logo"></slot>
        <a class="router-link-active" v-if="goBack" @click="$router.go(-1)">
            <button class="mint-button mint-button--default mint-button--normal">
              <span class="mint-button-icon">
                <i class="mintui mintui-back"></i>
              </span>
              <label class="mint-button-text">{{$t('m.goback')}}</label>
            </button>
        </a>
        <a class="router-link-active" v-if="cancel" @click="$router.go(-1)">
            <button class="mint-button mint-button--default mint-button--normal">
                <label class="mint-button-text">取消</label>
            </button>
        </a>
    </div>
    <h1 class="mint-header-title">
        <span v-if="headTitle">{{headTitle}}</span>
        <slot name="search"></slot>
    </h1>
    <div class="mint-header-button is-right" v-if="!unSearchFlag">
      <router-link :to="userInfo ? '/my' : '/login'" v-if="signinUp">
        <button class="mint-button mint-button--default mint-button--normal">
          <span class="mint-button-icon" v-if="userInfo">
            <img :src="userInfo.entity.avatar" :alt="userInfo.entity.nickname" class="user_avatar">
            <!--<svg class="user_avatar">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>-->
          </span>
          <label class="mint-button-text" v-else>{{$t('m.login')}}/{{$t('m.register')}}</label>
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
      props: ['headTitle', 'goBack', 'cancel', 'signinUp', 'isExtend', 'isWhite', 'unSearchFlag'],
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
    .extendHead {
        background: -moz-linear-gradient(left, rgba(208,219,225,1) 0%, rgba(144,163,177,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left, rgba(208,219,225,1) 0%,rgba(144,163,177,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right, rgba(208,219,225,1) 0%,rgba(144,163,177,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
    .whiteHead { background-color: #fff;color: #333 }
</style>
