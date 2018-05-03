<template>
    <div>
        <div class="main main-foot">
            <section class="u-index-head">
                <div class="facebook-card">
                    <router-link to="/my/userInfo">
                        <div class="clearfix">
                            <aside class="pull-right pr" style="margin-top: 1rem;">
                                <i class="mint-cell-allow-right"></i>
                            </aside>
                            <div class="facebook-avatar mr5">
                                <img :src="userInfo.entity.avatar" width="76" height="76" :alt="userInfo.entity.nickname || userInfo.entity.email">
                            </div>
                            <div class="facebook-name">
                                {{userInfo.entity.nickname || userInfo.entity.email}}
                            </div>
                            <div class="facebook-desc ellipsis">
                                <span class="c-ccc fs12">
                                    {{userInfo.entity.userInfo}}
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </section>
            <section class="page-infinite__wrap">
                <mt-cell title="我的课程" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="我的订单" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="我的考试" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="推广中心" is-link :to="openFlag ? '/extendIndex' : '/my'">
                    <span class="fs12" :class="openFlag ? 'c-danger' : 'c-999'">{{openFlag ? '已开通' : '未开通'}}</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="我的问答" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="我的话题" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
                <mt-cell title="我的会员" is-link to="/">
                    <span>&nbsp;</span>
                    <img slot="icon" src="" width="24" height="24">
                </mt-cell>
            </section>
        </div>
        <foot-top></foot-top>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { Cell, Toast } from 'mint-ui'
    import footTop from '@/components/footer/footer'
    import { checkAgentState } from '@/service/getData'

    export default {
    	data(){
            return{
                openFlag: false,       //是否开通推广状态
                userid: 0              //用户id
            }
        },
        mounted() {
            this.userid = this.userInfo.entity.id
            this.initData()
        },
        components: {
            Cell,
            footTop
        },
        computed: {
            ...mapState([
            	'userInfo'
            ])
        },
        methods: {
            ...mapMutations([
            	'USER_EXTEND_STATE'
            ]),
            //初始化数据
    		async initData() {
                //推广员状态校验
                await checkAgentState(this.userid).then(res => {
                    if(res.success) {
                        res.entity.isContinue ? this.openFlag = true : this.openFlag = false
                        this.USER_EXTEND_STATE(res)
                    } else {
                        Toast({
                            message: res.message,
                            position: 'middle',
                            duration: 5000
                        })
                    }
                })
            }

        }
    }

</script>

<style lang="scss" scoped>
    .u-index-head {
        background-color: #33384B;
        height: 5.4rem;
        padding: 0 1rem;
        .facebook-card {
            padding-top: 1.2rem;
            .facebook-avatar {
                float: left;
                img {
                    border-radius: 3rem;
                }
            }
        }
        .facebook-name {
            font-size: .8rem;
            color: #fff;
            text-indent: .5rem;
            padding-top: .2rem;
        }
        .facebook-desc {
            padding-top: .2rem;
            margin-left: 1rem;
            height: 2rem;
        }
    }
    .page-infinite__wrap {
        background-color: #fff;
        position: relative;
        height: calc(100% - 5.4rem);
        overflow-y: auto;
        overflow-x: hidden;
        .mint-cell {
            min-height: 58px;
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
