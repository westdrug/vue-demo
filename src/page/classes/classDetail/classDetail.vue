<template>
    <div>
        <head-top head-title="班级详情" goBack="true" isWhite="true">
            <span slot="edit">
                 <mt-button type="danger" size="small" plain @click="toSend">发表话题</mt-button>
            </span>
        </head-top>
        <div class="main">
            <div class="main-container">
                <section class="class-info__wrap">
                    <aside class="class-teacher-face__wrap">
                        <img v-lazy="classDetail[0].imageMap.mobileUrlMap.large" :alt="classDetail[0].className">
                    </aside>
                    <section class="hLh30 tac">
                        <span class="fs18 c-222">{{classDetail[0].className}}</span>
                    </section>
                    <section class="hLh30 tac">
                        <div v-if="classDetail[0].course !== null">
                            <span class="fs12 c-999 ml5" v-for="item in classDetail[0].course.teacherList" :key="item.id">
                                {{item.teacherName}}
                            </span>
                        </div>
                        <div v-else><span class="fs12 c-999">暂无班主任</span></div>
                    </section>
                    <section class="hLh30 tac txtOf">
                        <span class="fs12 c-666">{{classDetail[0].classInfo}}</span>
                    </section>
                    <section class="hLh30 tac txtOf">
                        <span class="fs12 c-999 ml5">{{classDetail[0].userNum}}</span>
                        <span class="fs12 c-999 ml5">{{classDetail[0].topicNum}}</span>
                    </section>
                    <section class="pt5">
                         <mt-button size="large" type="danger" @click="toSend">发表话题</mt-button>
                    </section>
                </section>
                <section class="class-topicList__wrap">
                    <article>
                        <ul v-if="classTopicArr.length" class="class-topicList-box">
                            <li class="item-li" v-for="item in classTopicArr" :key="item.id" @click="depositTopicInfo(item.id)">
                                <router-link :to="{path: '/classDetail/topicDetail', query: {id: item.id}}">
                                    <section class="w-face-info">
                                        <img v-lazy.main-container="item.user.avatar" :alt="item.user.name">
                                        <p class="hLh30">
                                            <span class="fs14 c-info">{{item.user.name || item.user.email}}</span>
                                        </p>
                                        <span class="fs12 c-999">{{item.createTime}}</span>
                                    </section>
                                    <section class="pt5">
                                        <h4 class="fs16 c-222">
                                            {{item.title}}
                                        </h4>
                                    </section>
                                    <section class="pt5">
                                        <section class="string-info__wrap">
                                            <span class="fs14 c-666">{{removeHtmlTag(item.context)}}</span>
                                        </section>
                                    </section>
                                    <section class="pt5">
                                        <div>
                                            <div class="topic-list-picture__wrap" v-if="item.topicImages != null || item.topicImages != ''">
                                                <section class="topic-list-picture-item" v-for="(item, index) in stringToArray(item.topicImages)" :key="index">
                                                    <aside class="topic-list-picture-shadow"></aside>
                                                    <img v-lazy.main-container="item" class="topic-l-picture">
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="pt5">
                                        <span class="fs12 c-999">{{item.lookNum}} 阅读</span>
                                        <span class="fs12 c-999 ml5">{{item.likeNum}} 点赞</span>
                                        <span class="fs12 c-999 ml5">{{item.replyNum}} 评论</span>
                                    </section>
                                </router-link>
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                <un-data :num="1" :tipText="tipText"></un-data>
                            </li>
                        </ul>
                        <transition name="loading">
                            <loading v-if="showLoading" :hideBg="true"></loading>
                        </transition>
                    </article>
                </section>
            </div>
        </div>
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
                    <div class="mint-tab-item-label">{{classDetail[0].joined ? '已加入' : '加入'}}</div>
                </a>
            </div>
        </footer>
        <transition :name="checkSendFlag ? 'router-slid' : 'router-sendTopic'" mode="out-in">
            <router-view></router-view>
            <router-view name="topicSend"></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/header'
    import loading from '@/components/common/loading'
    import unData from '@/components/common/un-data'
    import { Button } from 'mint-ui'
    import { classAllTopic } from '@/service/getData'
    import { stringToArray, removeHtmlTag } from '@/components/common/mixin'
    export default {
    	data(){
            return{
                showLoading: true,                           //显示加载动画
                tipText: '还没有，快发表话题吧~~~',
                checkSendFlag: true,
                userid: 0,
                classid: 0,
                classTopicArr: [],
                currentPage: 1,
                totalPage: 0
            }
        },
        mounted() {
            this.classid = this.$route.query.id
            if(this.userInfo !== null && this.login) this.userid = this.userInfo.entity.id

            this.initData()
        },
        components: {
            headTop,
            loading,
            unData,
            Button
        },
        computed: {
            ...mapState([
            	'login', 'userInfo', 'classDetail'
            ])
        },
        mixins: [stringToArray, removeHtmlTag],
        methods: {
            ...mapMutations([
            	'RESET_CLASS_DETAIL', 'RESET_CLASS_TOPICINFO'
            ]),
            async initData() {
            	await classAllTopic(this.classid, this.currentPage).then(res => {
                    if(res.success) {
            			if(res.entity) {
            				this.classTopicArr = [...this.classTopicArr, ...res.entity]
                        }
                        this.showLoading = false
                    }
                })
            },
            toSend() {
                this.checkSendFlag = false
                this.$router.push({path: '/classDetail/topicSend'})
            },
            depositTopicInfo(id) {
                if(this.classTopicArr.length <=0 ) return
                let currTopicObj = this.classTopicArr.filter((item) => {
            		return item.id === id
                })

                this.RESET_CLASS_TOPICINFO(currTopicObj)
                this.checkSendFlag = true
            }
        },
        destroyed() {     //实例销毁后调用
            //this.RESET_CLASS_DETAIL(null)
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../style/mixin";
    .bottom-menu__wrap { position: absolute;bottom: 0 }
    .main-container {
        @include wh(100%, 100%);
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .class-info__wrap {
        background-color: #fff;
        padding: 1rem 1.5rem;
        position: relative;
        min-height: 2rem;
        margin-top: 1px;
        .class-teacher-face__wrap {
            @include wh(3.4rem, 3.4rem);
            margin: 0 auto;
            transition: .3s;
            img {
                @include wh(100%, 100%);
                @include borderRadius(3rem);
                display: block;
                border: 1px solid #e4e4e4;
            }
        }
    }
    .class-topicList__wrap {
        background-color: #fff;
        margin-top: 5px;
        padding: .5rem 1rem;
        position: relative;
    }
    .class-topicList-box {
        .item-li {
            padding-bottom: .6rem;
            margin-bottom: .6rem;
            border-bottom: 1px solid #f2f2f2;
            a {
                color: #222;
                .w-face-info {
                    clear: both;
                    overflow: hidden;
                    img {
                        @include wh(2rem, 2rem);
                        @include borderRadius(2rem);
                        float: left;
                        margin-right: .5rem;
                        display: block;
                    }
                }
            }

        }
    }
    .topic-list-picture__wrap {
        @include fj(flex-start);
        flex-wrap: nowrap;
        .topic-list-picture-item {
            margin: .3rem 1.3% 0 0;
            text-align: center;
            @include wh(32%, 4rem);
            position: relative;
            overflow: hidden;
            .topic-l-picture {
                width: auto;
                height: 100%;
                max-width: inherit!important;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                display: block;
            }
            .topic-list-picture-shadow {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 7;
                background: -webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.65) 99%,rgba(0,0,0,.65) 100%);
                background: linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.65) 99%,rgba(0,0,0,.65) 100%);
            }
        }
    }
    .string-info__wrap {
        max-height: 5rem;
        min-height: 1rem;
        line-height: .8rem;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .router-slid-enter-active,
    .router-slid-leave-active,
    .router-sendTopic-enter-active,
    .router-sendTopic-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .router-sendTopic-enter, .router-sendTopic-leave-active {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
    }
</style>
