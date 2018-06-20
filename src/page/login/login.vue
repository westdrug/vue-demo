<template>
    <div class="login__wrap">
      <head-top :head-title="$t('m.login')" goBack="true">

      </head-top>
      <section class="paddingTop">
        <section class="card">
          <form class="loginForm">
            <section class="input_container">
              <input type="text" :placeholder="$t('m.account')" v-model.lazy.trim="userAccount">
            </section>
            <section class="input_container">
              <input v-if="!showPassword" type="password" :placeholder="$t('m.passWord')"  v-model.trim="passWord">
              <input v-else type="text" :placeholder="$t('m.passWord')"  v-model.lazy.trim="passWord">
              <div class="button_switch" :class="{change_to_text: showPassword}">
                <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                <span>abc</span>
                <span>...</span>
              </div>
            </section>
          </form>
          <p class="login_tips">&nbsp;</p>
          <mt-button type="primary" size="large" @click="loginSubmit">{{$t('m.login')}}</mt-button>
        </section>
      </section>
    </div>
</template>

<script>
    import headTop from '@/components/header/header'
    import { Button, Toast } from 'mint-ui'
    import { isEmpty, setStore } from '@/config/wUtils'
    import { mapState, mapMutations } from 'vuex'
    import { accountLogin } from '@/service/getData'
    export default {
        data(){
              return{
                showPassword: false,     //是否显示密码
                userAccount: null,      //用户名
                passWord: null,         // 密码
                userInfo: null          //获取到的用户信息
              }
        },
        components: {
            headTop,
            Button
        },
        methods: {
            ...mapMutations([
            	  'RECODE_USERINFO'
            ]),

        	//是否显示密码
            changePassWordType() {
                this.showPassword = !this.showPassword
            },
            //提交登录信息
            async loginSubmit() {

              if(isEmpty(this.userAccount)) {
              	Toast({
                  message: '请输入用户名',
                  position: 'top',
                  duration: 3000
                })
                return
              } else if(isEmpty(this.passWord)) {
                Toast({
                  message: '请输入密码',
                  position: 'top',
                  duration: 3000
                })
                return
              }

              //用户名登录
              this.userInfo = await accountLogin(this.userAccount, this.passWord)

              //如果返回的数据不正确，则提示。反之存入VUEX中
              if(isEmpty(this.userInfo) || !this.userInfo.success) {
                  Toast({
                    message: this.userInfo.message,
                    position: 'top',
                    duration: 3000
                  })
                  return
              } else {
                  this.RECODE_USERINFO(this.userInfo)
                  setStore('userInfo', this.userInfo)
                  //登录成功后重定向到前路由
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                  this.$router.replace({
                      path: redirect
                  })
                  //this.$router.go(-1)
              }
            }

        }
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .mint-header {background-color: #fff;border-bottom: 1px solid rgba(0,0,0,.1);box-shadow: 0 -0.2rem 0.2rem rgba(0,0,0,.01);color: #333}
  .loginForm{
      background-color: #fff;
      margin-top: .6rem;
      .input_container{
          display: flex;
          justify-content: space-between;
          padding: .6rem .8rem;
          border-bottom: 1px solid #f1f1f1;
          input{
            @include sc(.7rem, #666);
            @include wh(100%, 1rem)
          }
          button{
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue,Tahoma,Arial;
            padding: .28rem .4rem;
            border: 1px;
            border-radius: 0.15rem;
          }
          .right_phone_number{
            background-color: #4cd964;
          }
    }
    .phone_number{
      padding: .3rem .8rem;
    }
    .captcha_code_container{
      height: 2.2rem;
      .img_change_img{
        display: flex;
        align-items: center;
        img{
          @include wh(3.5rem, 1.5rem);
          margin-right: .2rem;
        }
        .change_img{
          display: flex;
          flex-direction: 'column';
          flex-wrap: wrap;
          width: 2rem;
          justify-content: center;
          p{
            @include sc(.55rem, #666);
          }
          p:nth-of-type(2){
            color: #3b95e9;
            margin-top: .2rem;
          }
        }
      }
    }
  }
  .login_tips{
    @include sc(.5rem, red);
      padding: .4rem .6rem;
      line-height: .5rem;
      a{
        color: #3b95e9;
      }
  }
  .button_switch{
    background-color: #ccc;
    display: flex;
    justify-content: center;
  @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
  .circel_button{
    transition: all .3s;
    position: absolute;
    top: -0.2rem;
    z-index: 1;
    left: -0.3rem;
  @include wh(1.2rem, 1.2rem);
    box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
    background-color: #f1f1f1;
    border-radius: 50%;
  }
  .trans_to_right{
    transform: translateX(1.3rem);
  }
  span{
  @include sc(.45rem, #fff);
    transform: translateY(.05rem);
    line-height: .6rem;
  }
  span:nth-of-type(2){
    transform: translateY(-.08rem);
  }
  }
  .change_to_text{
    background-color: #4cd964;
  }
</style>
