<template>
    <div class="rating_page">
        <div class="rating_page__wrap">
            <head-top head-title="个人资料" goBack="true"></head-top>
            <div class="content-padded">
                <section class="page-infinite__wrap">
                    <mt-cell title="头像">
                        <span><img :src="userInfo.entity.avatar" :alt="userInfo.entity.nickname || userInfo.entity.email" width="30" height="30"></span>
                    </mt-cell>
                    <div class="hLh30"></div>
                    <mt-cell title="昵称" is-link to="/">
                        <span>{{userInfo.entity.nickname || userInfo.entity.email}}</span>
                    </mt-cell>
                    <mt-cell title="密码" is-link to="/">
                        <span>******</span>
                    </mt-cell>
                    <div class="hLh30"></div>
                    <mt-cell title="姓名" is-link to="/my/userInfo/setNiceName">
                        <span>{{userInfo.entity.realName}}</span>
                    </mt-cell>
                    <mt-cell title="性别">
                        <span>
                            <select v-model="selected">
                                <option value="0">保密</option>
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </span>
                    </mt-cell>
                    <mt-cell title="手机号" is-link to="/">
                        <span>{{userInfo.entity.mobile}}</span>
                    </mt-cell>
                    <mt-cell title="邮箱" is-link to="/">
                        <span>{{userInfo.entity.email}}</span>
                    </mt-cell>
                    <div class="hLh30"></div>
                    <mt-cell title="个性签名" is-link to="/">
                        <span style="font-size: 12px;">{{userInfo.entity.userInfo}}</span>
                    </mt-cell><div class="hLh30"></div>
                    <mt-cell title="学业信息" is-link to="/">
                       <span></span>
                    </mt-cell>
                </section>
            </div>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/header'
    import { Cell, Toast } from 'mint-ui'
    export default {
    	data(){
            return{
                selected: 0
            }
        },
        mounted() {
        },
        components: {
            headTop,
            Cell,
            Toast
        },
        computed: {
            ...mapState([
            	'userInfo'
            ])
        },
        watch: {
            selected: function (val) {
                this.$nextTick(function () {
                    console.log('val:',val)
                })
            }
        }

    }

</script>

<style lang="scss" scoped>
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F5F6F8;
        z-index: 202;
        padding-top: 40px;
        .rating_page__wrap {
            position: relative;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
