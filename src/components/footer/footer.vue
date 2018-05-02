<template>
  <div class="mint-tabbar is-fixed">
    <a class="mint-tab-item" :class="currentPath === '/home' ? 'is-selected' : ''" @click="gotoAddress('/home')">
      <div class="mint-tab-item-icon">
          <img slot="icon" src="../../assets/menu/study-act.png" v-if="currentPath === '/home'">
          <img slot="icon" src="../../assets/menu/study.png" v-else>
      </div>
      <div class="mint-tab-item-label">学习</div>
    </a>
    <a class="mint-tab-item" :class="currentPath === '/list' ? 'is-selected' : ''" @click="gotoAddress('/list')">
      <div class="mint-tab-item-icon">
          <img slot="icon" src="../../assets/menu/course.png" v-if="currentPath === '/list'">
          <img slot="icon" src="../../assets/menu/course.png" v-else>
      </div>
      <div class="mint-tab-item-label">选课</div>
    </a>
    <a class="mint-tab-item" @click="">
      <div class="mint-tab-item-icon"><img slot="icon" src="../../assets/menu/exam.png"></div>
      <div class="mint-tab-item-label">考试</div>
    </a>
    <a class="mint-tab-item" @click="">
      <div class="mint-tab-item-icon"><img slot="icon" src="../../assets/menu/class.png"></div>
      <div class="mint-tab-item-label">社区</div>
    </a>
      <a class="mint-tab-item" :class="currentPath === '/my' ? 'is-selected' : ''" @click="gotoAddress('/my')">
        <div class="mint-tab-item-icon">
            <img slot="icon" src="../../assets/menu/user-act.png" v-if="currentPath === '/my'">
            <img slot="icon" src="../../assets/menu/user.png" v-else>
        </div>
        <div class="mint-tab-item-label">我的</div>
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
