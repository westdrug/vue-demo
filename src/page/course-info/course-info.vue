<template>
    <div class="course-detail__wrap">
        <section class="course-play__wrap">
            <div class="course-play-bg" :style="{backgroundImage: 'url(' + coursePic + ')'}"></div>
            <div class="cp-shadow"></div>
            <aside class="course-play-btn"></aside>
        </section>
        <article class="tab-box__wrap">
            <section class="tab-title__wrap">
                <div class="mint-navbar">
                    <a class="mint-tab-item" :class="active === 'tab-container1' ? 'is-selected' : ''" @click="navBarFn('tab-container1')">
                        <div class="mint-tab-item-icon"></div>
                        <div class="mint-tab-item-label">详情</div>
                    </a>
                    <a class="mint-tab-item" :class="active === 'tab-container2' ? 'is-selected' : ''" @click="navBarFn('tab-container2')">
                        <div class="mint-tab-item-icon"></div>
                        <div class="mint-tab-item-label">目录</div>
                    </a>
                    <a class="mint-tab-item" :class="active === 'tab-container3' ? 'is-selected' : ''" @click="navBarFn('tab-container3')">
                        <div class="mint-tab-item-icon"></div>
                        <div class="mint-tab-item-label">反馈</div>
                    </a>
                </div>
            </section>
            <section class="tab-content__wrap">
                <mt-tab-container v-model="active" :swipeable='true' value="tab-container1">
                    <mt-tab-container-item id="tab-container1">
                        <div class="c-divScroll__wrap">
                            <section class="content-padded pr5 pl5">
                                <div>
                                    <span class="fs18 c-333">{{courseDetail.course.courseName}}</span>
                                </div>
                                <div class="hLh30">
                                    <img :src="item.imageMap.mobileUrlMap.large" :alt="item.teacherName" v-for="item in courseDetail.course.teacherList" :key="item.id" style="width: .9rem;height: .9rem;">
                                </div>
                                <div class="fs14 c-666" v-html="courseDetail.course.details"></div>
                            </section>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container2">
                        <div class="c-divScroll__wrap">
                            <section class="content-padded pr5 pl5">
                                <div v-if="catalogList.length">
                                    <dl v-for="item in catalogList" :key="item.id">
                                        <dt><p class="hLh30"><span class="fs14 c-333">{{item.catalogName}}</span></p></dt>
                                        <dd v-if="item.subCatalogList.length">
                                            <section v-for="item in item.subCatalogList" :key="item.id">
                                                <p class="hLh30"><span class="fs12 c-666">{{item.catalogName}}</span></p>
                                            </section>
                                        </dd>
                                    </dl>

                                </div>
                                <div v-else>
                                    <un-data :num="2" :tipText="tipText1"></un-data>
                                </div>
                            </section>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container3">
                        <div class="c-divScroll__wrap" v-scroll-load="scrollLoadMore" type="2">
                            <section class="content-padded pr5 pl5">
                                <div class="hLh30"><span class="fs14">全部反馈（{{commentNum}}）</span></div>
                                <section>
                                    <ul v-if="commentList.length">
                                        <li style="border-top: 1px solid #f2f2f2;margin-top: .3rem;" v-for="item in commentList" :key="item.id">
                                            <img :src="item.user.avatar" :alt="item.user.nickname" style="width: .8rem;height: .8rem;">
                                            <span class="fs12 c-999">{{item.comment}}</span>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li>
                                            <un-data :num="1" :tipText="tipText2"></un-data>
                                        </li>
                                    </ul>
                                    <load-data :hasRefresh="hasRefresh" :hasMore="hasMore"></load-data>
                                </section>
                            </section>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </section>
            <footer class="bottom-menu__wrap">
                <div class="mint-tabbar">
                    <a class="mint-tab-item">
                        <div class="mint-tab-item-icon">
                            <svg width="100%" height="100%">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                            </svg>
                        </div>
                        <div class="mint-tab-item-label">分享</div>
                    </a>
                    <a class="mint-tab-item">
                        <div class="mint-tab-item-icon">
                            <svg width="100%" height="100%">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                            </svg>
                        </div>
                        <div class="mint-tab-item-label">评论</div>
                    </a>
                    <a class="mint-tab-item">
                        <mt-button size="large" type="danger">
                            <small class="fs12">￥</small>
                            <strong class="fs18">{{courseDetail.course.realPrice}}</strong>
                            <span class="fs14">立即报名</span>
                        </mt-button>
                    </a>
                </div>
            </footer>
        </article>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { getCourseDetail, getCourseMenu, getCourseComment } from '@/service/getData'
    import loading from '@/components/common/loading'
    import unData from '@/components/common/un-data'
    import loadData from '@/components/common/load-data'
    import { Navbar, TabContainer, TabContainerItem, Button } from 'mint-ui'
    import { scrollLoad } from '@/components/common/mixin'
    export default {
    	data(){
            return{
                showLoading: true,                           //显示加载动画
                tipText1: '暂无目录，小编正在整理上传中...',   //缺省提示
                tipText2: '亲，暂无反馈...',                  //缺省提示
                userId: 0,                                  //用户id
                courseId: 17,                                //课程id
                orderNo: '',                                //课程订单号
                coursePic: '',                              //封面图片
                courseDetail: {                             //课程详情
                    course: {}
                },
                catalogList: [],                            //课程目录
                currentPage: 1,                             //反馈当前页
                totalPage: 0,                               //反馈总页码
                catalogId: 0,                               //播放章节Id
                commentList: [],                            //课程反馈
                commentNum: 0,                              //反馈总数
                hasRefresh: false,                          //加载状态显示
                hasMore: false,                             //加载动画
                preventRepeatReuqest: false,                //到达底部加载数据，防止重复加载
                active: "tab-container1"
             }
        },
        created() {
    	    //this.courseId = parseInt(this.$route.params.courseId)
            this.orderNo = this.$route.params.orderNo ? this.$route.params.orderNo : ''
        },
        mounted() {
            if(this.userInfo) this.userId = this.userInfo.entity.id
    	    this.initData()
        },
        components: {
            loading,
            unData,
            loadData,
            Navbar,
            TabContainer,
            TabContainerItem
        },
        computed: {
            ...mapState([
            	'userInfo'
            ])
        },
        mixins: [scrollLoad],
        methods: {
    		async initData() {
    			//详情
    			await getCourseDetail(this.userId, this.courseId, this.orderNo).then(res => {
                    this.courseDetail = {...res.entity}
                    this.coursePic = res.entity.course.imageMap.mobileUrlMap.large
                }).then(() => {
                    //目录
                    getCourseMenu(this.courseId).then(res => {
                        this.catalogList = [...res.entity[0].course.catalogList]
                    }).then(() => {
                        //反馈
                        this.getCourseCommentFn()
                    })
                })
            },
            getCourseCommentFn() {
                getCourseComment(this.courseId, this.currentPage, this.catalogId).then(res => {
                    let commentMapList = res.entity.commentMapList
                    if(commentMapList) this.commentList = this.currentPage === 1 ? [...commentMapList] : [...this.commentList, ...commentMapList]
                    this.totalPage = res.entity.page.totalPages
                    this.commentNum = res.entity.page.totalCount
                }).then(() => {
                    this.currentPage === 1 ? this.showLoading = false : this.preventRepeatReuqest = false
                })
            },
            async scrollLoadMore() {
                //防止重复请求
    			if(this.preventRepeatReuqest) return

                this.preventRepeatReuqest = true
                this.hasRefresh = true

                if(this.currentPage === this.totalPage) {
    				this.hasMore = false
                    return
                }

                this.currentPage++
                if(this.currentPage <= this.totalPage) {
    				this.hasMore = true
                    this.getCourseCommentFn()
                } else {
    				this.hasMore = false
                    return
                }
            },
            navBarFn(id) {
                this.active = id
            }
        },
        watch: {
    		//监听左右滑动动作
            /*active(newValue) {

            }*/
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    html,body {overflow: hidden}
    .course-detail__wrap {
        @include wh(100%, 100%);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .course-play__wrap {
            @include bis('http://res.268xue.com/res/static/front/mobile/v3/img/default/loading.gif');
            background-color: #333;
            background-position: 50% 50%;
            background-size: 10% 20%;
            @include wh(100%, 8.8rem);
            position: relative;
        }
        .course-play-bg, .cp-shadow {
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
            @include wh(100%, 100%);
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
        }
        .cp-shadow {
            background: -moz-linear-gradient(top,rgba(0,0,0,.65) 0,rgba(0,0,0,0) 100%);
            background: -webkit-linear-gradient(top,rgba(0,0,0,.65) 0,rgba(0,0,0,0) 100%);
            background: linear-gradient(to bottom,rgba(0,0,0,.65) 0,rgba(0,0,0,0) 100%);
            z-index: 9;
        }
        .course-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            @include wh(3rem, 3rem);
            @include bis('http://res.268xue.com/res/static/front/mobile/v3/img/study/play-icon.png');
            z-index: 5;
        }
    }
    .tab-title__wrap {
        @include wh(100%, 2rem);
        .mint-tab-item-label {
            font-size: .6rem;
        }
    }
    .tab-box__wrap {
        @include wh(100%, calc(100% - 8.8rem));
        position: relative;
        .tab-content__wrap {
            @include wh(100%, calc(100% - 4rem));
            position: relative;
            overflow: hidden;
            .mint-tab-container {
                @include wh(100%, 100%);
                .mint-tab-container-wrap {
                    @include wh(100%, 100%);
                    .mint-tab-container-item {
                        @include wh(100%, 100%);
                        .c-divScroll__wrap {
                            @include wh(100%, 100%);
                            position: relative;
                            overflow-x: hidden;
                            overflow-y: auto;
                            word-break: break-all;
                            word-wrap: break-word;
                        }
                    }
                }
            }
        }
    }

</style>
