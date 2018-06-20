<template>
  <div class="mint-tabbar is-fixed">
    <a class="mint-tab-item" :class="currentPath === '/home' ? 'is-selected' : ''" @click="gotoAddress('/home')">
      <div class="mint-tab-item-icon">
          <img slot="icon" src="../../assets/menu/study-act.png" v-if="currentPath === '/home'">
          <img slot="icon" src="../../assets/menu/study.png" v-else>
      </div>
      <div class="mint-tab-item-label">{{$t('m.menu.study')}}</div>
    </a>
    <a class="mint-tab-item" :class="currentPath === '/list' ? 'is-selected' : ''" @click="gotoAddress('/list')">
      <div class="mint-tab-item-icon">
          <img slot="icon" src="../../assets/menu/course-act.png" v-if="currentPath === '/list'">
          <img slot="icon" src="../../assets/menu/course.png" v-else>
      </div>
      <div class="mint-tab-item-label">{{$t('m.menu.course')}}</div>
    </a>
    <a class="mint-tab-item" @click="">
      <div class="mint-tab-item-icon"><img slot="icon" src="../../assets/menu/exam.png"></div>
      <div class="mint-tab-item-label">{{$t('m.menu.exam')}}</div>
    </a>
    <a class="mint-tab-item" :class="currentPath === '/classIndex/1' || currentPath === '/classIndex/2' || currentPath === '/classIndex/3' ? 'is-selected' : ''" @click="gotoAddress('/classIndex/1')">
      <div class="mint-tab-item-icon">
          <img slot="icon" src="../../assets/menu/class-act.png" v-if="currentPath === '/classIndex/1' || currentPath === '/classIndex/2' || currentPath === '/classIndex/3'">
          <img slot="icon" src="../../assets/menu/class.png" v-else>
      </div>
      <div class="mint-tab-item-label">{{$t('m.menu.classes')}}</div>
    </a>
      <a class="mint-tab-item" :class="currentPath === '/my' ? 'is-selected' : ''" @click="gotoAddress('/my')">
        <div class="mint-tab-item-icon">
            <img slot="icon" src="../../assets/menu/user-act.png" v-if="currentPath === '/my'">
            <img slot="icon" src="../../assets/menu/user.png" v-else>
        </div>
        <div class="mint-tab-item-label">{{$t('m.menu.my')}}</div>
      </a>
  </div>

</template>

<script>
    export default {
    	data(){
            return{
                currentPath: '/home'
            }
        },
        created() {
            this.currentPath = this.$router.currentRoute.fullPath
        },
        components: {},
        methods: {
            gotoAddress(path) {
                this.$router.push(path)
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
