<template>
    <div>
        <head-top head-title="推广中心" goBack="true" isExtend="true"></head-top>
        <div class="main main-head">
            <!--已开通 推广中心-->
            <section v-if="isExtender && userExtendInfo" style="height: 100%">
                <header class="uAgent-head-bx">
                    <div style="padding-top: 1.6rem;">
                        <div class="uAgent-head__wrap">
                            <section class="wui-flex">
                                <section class="wui-flex-item">
                                    <span class="fs12 c-999">总收益</span>
                                    <p class="c-333">
                                        <small class="fs12">￥</small>
                                        <strong class="fs16">{{incomeSumPrice}}</strong>
                                    </p>
                                </section>
                                <section class="wui-flex-item">
                                    <span class="fs12 c-999">客户</span>
                                    <p class="c-333">
                                        <strong class="fs16">{{customerNum}}</strong>
                                    </p>
                                </section>
                                <section class="wui-flex-item">
                                    <span class="fs12 c-999">推广订单</span>
                                    <p class="c-333">
                                        <strong class="fs16">{{orderNum}}</strong>
                                    </p>
                                </section>
                                <section class="wui-flex-item" v-if="userType === 1">
                                    <span class="fs12 c-999">下级推广员</span>
                                    <p class="c-333">
                                        <strong class="fs16">{{childNum}}</strong>
                                    </p>
                                </section>
                            </section>
                            <section class="pl5 pr5">
                                <section class="content-padded">
                                    <mt-button type="danger" size="large" v-if="isInvite === 1">邀请好友成为推广员</mt-button>
                                    <mt-button type="danger" size="large" v-else-if="isInvite === 2" disabled>邀请好友的权限被禁止，请联系管理员</mt-button>
                                    <mt-button type="danger" size="large" v-else-if="userType === 2" disabled>您还未有邀请好友的权限哦</mt-button>
                                    <mt-button type="danger" size="large" v-else-if="status !== 1" disabled>邀请的权限被限制，请联系管理员</mt-button>
                                </section>
                            </section>
                        </div>
                    </div>
                </header>
                <div class="extend-course__wrap">
                    <section class="extend-course-scorll__wrap" v-scroll-load="scrollLoadMore" type="2">
                        <div class="content-padded">
                            <p class="pt5"><strong class="fs14 c-666">课程列表</strong></p>
                            <section v-if="anentCourseArr.length">
                                <ul>
                                    <li class="course_li" v-for="(item, index) in anentCourseArr" :key="item.id">
                                        <section>
                                            <img :alt="item.courseName" class="course_img" v-lazy="item.imageMap.mobileUrlMap.small">
                                        </section>
                                        <hgroup class="course_right">
                                            <h4 class="course_title_ellipsis">{{item.courseName}}</h4>
                                            <div class="course_attr">
                                                <span class="fs12 c-999">{{item.teacherList[0].teacherName}}</span>
                                                <span class="fs12 c-999">{{item.buyCount}}</span>
                                            </div>
                                            <div class="course-attr clearfix">
                                                <aside class="pull-right">
                                                    <mt-button plain type="danger" size="small"  @click="agentCourseTg(item.id)" >推广</mt-button>
                                                </aside>
                                                <span class="fs12 c-danger">￥</span>
                                                <strong :class="item.realPrice > 0 ? 'c-danger' : 'c-success'" class="fs16">{{item.realPrice > 0 ? item.realPrice : '免费'}}</strong>
                                            </div>
                                        </hgroup>
                                    </li>
                                </ul>
                            </section>
                            <section v-else>
                                <un-data :num="1" :tipText="tipText"></un-data>
                            </section>
                            <load-data :hasRefresh="hasRefresh" :hasMore="hasMore"></load-data>
                        </div>
                    </section>
                </div>
            </section>
            <!--未开通 推广中心-->
            <section v-else>
                <div class="card" style="overflow: hidden">
                    <div class="content-padded pl5 pr5">
                        <section>
                            <span class="fs16 c-333">推广中心已开通，现在可以申请成为推广员啦</span>
                        </section>
                        <section class="paddingTop">
                            <span class="fs16 c-333">成为推广员有什么好片呢？</span>
                            <section class="pl5">
                                <section class="content-padded">
                                    <div>
                                        <span class="fs12 c-666">1、拥有向外推广课程的权限</span>
                                    </div>
                                    <div>
                                        <span class="fs12 c-666">2、如有人通过你的推广链接购买了课程（或未来其它具有支付性质的内容），则你可获得推广收益</span>
                                    </div>
                                    <div>
                                        <span class="fs12 c-666">3、推广越多，收益越多</span>
                                    </div>
                                </section>
                            </section>
                        </section>
                        <section class="paddingTop">
                            <mt-button type="danger" size="large">申请成为推广员</mt-button>
                        </section>
                        <section class="hLh30 tac">
                            <span class="fs12 c-999">累计</span>
                            <strong class="fs12 c-warning">{{agentNum}}</strong>
                            <span class="fs12 c-999">名学员成为了推广员</span>
                        </section>
                    </div>
                </div>
            </section>
        </div>
        <share :mintActionshare="mintActionshare" @mintActionshareFn="actionshareFn" @inviterCardFlagFn="creatInviterCard"></share>
        <inviter-card :inviterCardFlag="inviterCardFlag" :currCourseShare="currCourseShare"></inviter-card>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/header'
    import loading from '@/components/common/loading'
    import { Button, Toast, Lazyload } from 'mint-ui'
    import { checkAgentNumber, getAgentIndData, getAgentIndCourse } from '@/service/getData'
    import { scrollLoad, scrollLoadMoreFn } from '@/components/common/mixin'
    import unData from '@/components/common/un-data'
    import loadData from '@/components/common/load-data'
    import share from '@/components/common/share'
    import inviterCard from '@/components/common/inviterCard'
    export default {
    	data(){
            return{
                showLoading: true,
                tipText: '亲，推广课程小编正在整理中...',
                agentNum: 0,
                uagentid: 0,
                childNum: '-',
                customerNum: '-',
                incomeSumPrice: '-',
                isInvite: null,
                orderNum: '-',
                settlementNum: '-',
                status: null,
                userType: null,
                shareUrl: '',
                currentPage: 1,
                totalPage: 0,
                anentCourseArr: [],
                hasRefresh: false,                          //加载状态显示
                hasMore: false,                             //加载动画
                preventRepeatReuqest: false,                //到达底部加载数据，防止重复加载
                mintActionshare: false,
                inviterCardFlag: false,
                currCourseShare: ''
            }
        },
        created() {
            document.querySelector('body').setAttribute('class', 'hidden')
        },
        mounted() {
    		this.initData()
        },
        components: {
            headTop,
            loading,
            Button,
            Toast,
            unData,
            loadData,
            share,
            inviterCard
        },
        computed: {
            ...mapState([
            	'userInfo', 'isExtender', 'userExtendInfo'
            ])
        },
        mixins: [scrollLoad],
        methods: {
    		async initData() {
    			if(this.isExtender && this.userExtendInfo) {   // 已是推广员
    				 //主页数据
                    await getAgentIndData(this.userInfo.entity.id).then(res => {
                        if(res.success) {
                    		this.incomeSumPrice = res.entity.incomeSumPrice > 0 ? res.entity.incomeSumPrice : '0.00'
                            this.customerNum = res.entity.customerNum
                            this.orderNum = res.entity.orderNum
                            this.isInvite = res.entity.isInvite
                            this.status = res.entity.status
                            this.childNum = res.entity.childNum ? res.entity.childNum : 0
                            this.userType = res.entity.userType
                            this.shareUrl = res.entity.shareUrl
                        }
                    }).then(() => {
                    	this.angentCourseFn()
                    })
                } else {    //不是推广员
                    await checkAgentNumber().then(res => {
                        if(res.success) {
                    		this.agentNum = res.entity.count
                        }
                    }).then(() => {
                        let msg = this.userExtendInfo.success ? this.userExtendInfo.entity.msg : this.userExtendInfo.message
                        this.showLoading = false

                        Toast({
                            message: msg,
                            position: 'middle',
                            duration: 5000
                        });
                    })
                }
            },
            //推广课程
            angentCourseFn() {
                getAgentIndCourse(this.currentPage, this.userInfo.entity.id, 2).then(res => {
                    if(res.success) {
                		if(res.entity.data) this.anentCourseArr = this.currentPage === 1 ? [...res.entity.data] : [...this.anentCourseArr, ...res.entity.data]
                        this.totalPage = res.entity.page.totalPages
                	}
                }).then(() => {
                    this.currentPage === 1 ? this.showLoading = false : this.preventRepeatReuqest = false
                })
            },
            scrollLoadMore() {
                scrollLoadMoreFn(this, this.angentCourseFn)
            },
            agentCourseTg(cId) {
                let currCourse = this.anentCourseArr.filter((ele) => {
                	if(ele.id === cId) return ele
                })
                this.mintActionshare = true
                this.currCourseShare = [...currCourse]
            },
            //创建邀请卡
            creatInviterCard(arr) {
                this.mintActionshare = arr[0].s
                this.inviterCardFlag = arr[0].i
            },
            //接收子组件的关闭状态
            actionshareFn(val) {
                this.mintActionshare = val
            }
        },
        watch: {

        },
        beforeDestroy() {        //实例销毁之前调用
            document.querySelector('body').setAttribute('class', '')
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../../../style/mixin';
    .uAgent-head-bx {
        background: -moz-linear-gradient(left, rgba(208,219,225,1) 0%, rgba(144,163,177,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left, rgba(208,219,225,1) 0%,rgba(144,163,177,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right, rgba(208,219,225,1) 0%,rgba(144,163,177,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        @include wh(100%, 4.6rem)
    }
    .uAgent-head__wrap {
        background-color: #fff;
        @include borderRadius(3px);
        box-shadow: 0 0 3rem rgba(0,0,0,0.1);
        margin: 0 10px;
        padding: 10px 0;
        position: relative;
        z-index: 9
    }
    .wui-flex {
        align-self: center;
        @include fj;
        .wui-flex-item {
            flex: 1;
            text-align: center;
            padding: 0 .1rem;
        }
    }
    .extend-course__wrap {
        margin-top: 2.4rem;
        @include wh(100%, calc(100% - 7rem));
        .extend-course-scorll__wrap {
            @include wh(100%, 100%);
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            .course_li {
                display: flex;
                border-bottom: 0.025rem solid #f1f1f1;
                padding: 0.7rem 0.4rem;
            }
            .course_img {
                display: block;
                width: 4.2rem;
                margin-right: .5rem;
            }
            .course_right {
                flex: auto;
                .course_title_ellipsis {
                    /*height: 1.2rem;*/
                    line-height: 1.2rem;
                    /*overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;*/
                    @include font(.66rem, 1.2rem, 'PingFangSC-Regular');
                    color: #333;
                }
                .course_attr {
                    height: 1rem;
                    line-height: 1rem;
                    overflow: hidden;
                    .course_attr > span {
                        marginr-right: .4rem;
                    }
                }
            }
        }
    }
</style>
