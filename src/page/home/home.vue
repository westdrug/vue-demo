<template>
    <div>
        <head-top head-title="首页1" signinUp="home">
          <em slot="logo" class="head_logo" @click="reload">W</em>
        </head-top>
        <div class="main">
          <section class="banner">
            <mt-swipe :auto="0" @change="handleChange" :continuous="false">
              <mt-swipe-item v-for="item in bannerList" :key="item.id"><img :src="item.imageMap.url" :alt="item.depict"></mt-swipe-item>
            </mt-swipe>
          </section>
          <section class="content-padded">
              <input v-model="message" placeholder="edit me">
              <p>国际化切换：Message is: {{ message }}</p>
              <div class="pt5">
                  <span @click="openMessage($event)">
                    <mt-button data="primary" type="primary">{{btnTxt}}</mt-button>
                  </span>
              </div>
          </section>
            <section class="content-padded">
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myMember')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myOrder')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myExam')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.extendCenter')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myQuestion')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myTopic')}}</span></p>
                <p class="hLh30"><span class="fs14 c-master">{{$t('m.myMember')}}</span></p>
            </section>
        </div>
        <foot-top></foot-top>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/header'
    import {
      Swipe,
      SwipeItem,
      Button,
      MessageBox } from 'mint-ui'
    import footTop from '@/components/footer/footer'
    import loading from '@/components/common/loading'
    import { bannerIndex, searchCourse } from '@/service/getData'

    export default {
    	data() {
            return{
                showLoading: true,      //显示加载动画
                message: '',
                bannerList: [],
                btnTxt: '切换英文',
                lang: 'zh-CN'           //默认语言
            }
      },
      mounted() {       //  生命周期钩子  新创建的 vm.$el 并挂载到实例上去之后调用该钩子
          this.initData();
      },
      components: {     // 可用组件
          headTop,
          Swipe,
          SwipeItem,
          Button,
          MessageBox,
          footTop,
          loading
      },
      computed: {      // 读取 &设置
        ...mapState([
          'userInfo'
        ])
      },
      methods: {       // 访问方法
          //初始化时获取基本数据
          async initData() {
            //console.log('登录信息：',this.userInfo)
            //获取banner
            await bannerIndex().then(res => {
                if(res.success) {
                    this.bannerList = res.entity
                }
            }).then(() => {
            	this.showLoading = false
            })

          },
          handleChange(index) {
            console.log(index)
          },
          openMessage(event) {
              //console.log(event.target.getAttribute('data'))
              MessageBox.confirm('确定要切换语言吗?').then(action => {
                  console.log(action)
                  if(action === 'confirm' && this.lang === 'zh-CN') {
                      this.btnTxt = '切换中文'
                  	  this.lang = 'en-US'
                      this.$i18n.locale = this.lang     //修改全局属性
                  } else {
                      this.btnTxt = '切换英文'
                      this.lang = 'zh-CN'
                      this.$i18n.locale = this.lang     //修改全局属性
                  }
              })
          },
          reload() {
            window.location.reload()
          }
      },
      watch: {        //  观察

      }
    }

</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .banner {
      @include wh(100%, 5rem);
      background-color: #a3dca5;
    }
</style>
