<template>
    <div class="rating_page">
        <head-top head-title="话题详情" goBack="true" isWhite="true">
            <span slot="edit">
                <span class="fs14 c-info">举报</span>
            </span>
        </head-top>
        <div class="main">
            <div class="rating_page__wrap">
                <section class="hLh30 clearfix pl5 pr5" style="background-color: #F5F6F8">
                    <router-link :to="{path: '/classDetail', query: {id: classDetail[0].id}}">
                        <aside class="pull-right">
                            <span class="fs12 c-9999">></span>
                        </aside>
                        <aside class="pull-left">
                            <img class="vam" style="width: 1rem;height: 1rem;border-radius: 1rem;" v-lazy="classDetail[0].imageMap.mobileUrlMap.large" :alt="classDetail[0].className">
                            <span class="ml5 fs12 c-666 vam">{{classDetail[0].className}}</span>
                        </aside>
                    </router-link>
                </section>
                <section class="content-padded">
                    <article class="pt5 ml5 mr5">
                        <section><span class="fs24">{{classTopicDetail[0].title}}</span></section>
                        <section class="pt5">
                            <section class="w-face-info">
                                <img v-lazy.rating_page__wrap="classTopicDetail[0].user.avatar" :alt="classTopicDetail[0].user.name">
                                <p class="hLh30">
                                    <span class="fs14 c-info">{{classTopicDetail[0].user.name || classTopicDetail[0].user.email}}</span>
                                </p>
                                <span class="fs12 c-999">{{classTopicDetail[0].createTime}}</span>
                            </section>
                            <section class="pt5 pl5 pr5">
                                <div class="fs14 c-333" style="line-height: 220%">
                                    {{removeHtmlTag(classTopicDetail[0].context)}}
                                </div>
                                <div class="pt5">
                                    <div class="topic-list-picture__wrap">
                                        <section class="topic-list-picture-item" v-for="(item, index) in stringToArray(classTopicDetail[0].topicImages)" :key="index">

                                            <img v-lazy.rating_page__wrap="item" class="topic-l-picture">
                                        </section>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section class="pt5">
                            <div class="topic-comment__wrap">
                                <h6 class="hLh30"><strong class="fs14 c-333">评论列表（{{commentNumber}}）</strong></h6>
                                <section class="topic-comment-box">
                                    <ul v-if="topicCommentArr.length > 0">
                                        <li class="topic-comment-li" v-for="item in topicCommentArr" :key="item.id">
                                            <section class="w-face-info">
                                                <img v-lazy.rating_page__wrap="item.replyUser.avatar" :alt="item.replyUser.name">
                                                <p class="clearfix">
                                                    <aside class="pull-right">
                                                        <span class="fs12 c-666" @click="toReply()">回复({{item.replyNum}})</span>
                                                    </aside>
                                                    <span class="fs12 c-info">{{item.replyUser.name || item.replyUser.email}}</span>
                                                </p>
                                                <span class="fs12 c-999">{{item.replyTime}}</span>
                                            </section>
                                            <section style="padding-left: 1.7rem;">
                                                <p><span class="fs14 c-333">{{item.context}}</span></p>
                                                <section class="pt5" v-if="item.subReplyList.length > 0">
                                                    <div class="question-aq-txt__wrap" v-for="item in item.subReplyList" :key="item.id">
                                                        <section class="question-reply-item">
                                                            <span class="fs12 c-info">{{item.replyUser.nickname}}：</span>
                                                            <span class="fs12 c-333">{{item.context}}</span>
                                                        </section>
                                                    </div>
                                                </section>
                                            </section>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li>
                                            <un-data :num="3" :tipText="tipText"></un-data>
                                        </li>
                                    </ul>
                                    <transition name="loading">
                                        <loading v-if="showLoading" :hideBg="true"></loading>
                                    </transition>
                                </section>
                            </div>
                        </section>
                    </article>
                </section>
                <div class="comment-shadow-bg" v-show="openCtFlag" @click="cmShadowFn"></div>
            </div>
        </div>

        <footer class="bottom-menu__wrap">
            <div class="mint-tabbar">
                <section class="mint-tab-item">
                    <div v-if="openCtFlag">
                        <input class="comment-inp vam" maxlength="200" placeholder="别憋着，说两句吧..." type="text" v-model.trim="commentInpVal">
                        <button class="comment-btn fs16 vam" :disabled="isEmpty" @click="sendTopicFn">发布</button>
                    </div>
                    <div v-else class="comment-inp__wrap" @click="chageCommentFn"><span class="fs12 c-999">说两句吧~~~</span></div>
                </section>
                <a class="mint-tab-item" v-show="!openCtFlag">
                    <div class="mint-tab-item-icon">
                        <svg width="100%" height="100%">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                        </svg>
                    </div>
                    <div class="mint-tab-item-label">点赞</div>
                </a>
                <a class="mint-tab-item" v-show="!openCtFlag">
                    <div class="mint-tab-item-icon">
                        <svg width="100%" height="100%">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                    </div>
                    <div class="mint-tab-item-label">分享</div>
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/header'
    import { stringToArray, removeHtmlTag } from '@/components/common/mixin'
    import { topicAllComment, sendTopicComment } from '@/service/getData'
    import loading from '@/components/common/loading'
    import unData from '@/components/common/un-data'
    import { MessageBox, Toast } from 'mint-ui'
    export default {
    	data(){
            return{
                showLoading: true,
                tipText: '还没有，快抢沙发吧~~~',
                topicCommentArr: [],
                currentPage: 1,
                totalPage: 0,
                userid: 0,                          //用户ID
                topicid: 0,                         //话题ID
                classid: 0,                         //班级ID
                targetReplyId: 0,                   //被评论评论ID
                openCtFlag: false,
                isEmpty: true,
                commentInpVal: '',
                commentNumber: 0
            }
        },
        mounted() {
            if(this.userInfo !== null && this.login) this.userid = this.userInfo.entity.id
            this.classid = this.classDetail[0].id
            this.topicid = this.classTopicDetail[0].id
            this.initData()
        },
        components: {
            headTop,
            loading,
            unData,
            MessageBox,
            Toast
        },
        computed: {
            ...mapState([
            	'login', 'userInfo', 'classDetail', 'classTopicDetail'
            ])
        },
        mixins: [stringToArray, removeHtmlTag],
        methods: {
            ...mapMutations([
            	'RESET_CLASS_TOPICINFO'
            ]),
            async initData() {
            	await topicAllComment(this.classDetail[0].id, this.classTopicDetail[0].id, this.currentPage).then(res => {
                    if(res.success) {
            			if(res.entity !== null) {
            				this.topicCommentArr = [...this.topicCommentArr, ...res.entity]
                            this.commentNumber = this.topicCommentArr.length
                        }
                        this.showLoading = false
                    }
                })
            },
            chageCommentFn() {
                if(this.userInfo === null && !this.login) {
                    MessageBox.confirm('登录后再评论，去登录？').then(action => {
                        if(action === 'confirm') this.$router.push({path: '/login', query: {redirect: this.$router.currentRoute.fullPath}})
                    })
                	return
                }
                this.cmShadowFn()
            },
            cmShadowFn() {
                this.openCtFlag = !this.openCtFlag
            },
            sendTopicFn() {
                if(this.commentInpVal === '') {
                    Toast({
                        message: '说两句吧！',
                        position: 'middle',
                        duration: 5000
                    });
            		return
                }
                sendTopicComment(this.userid,this.topicid,this.targetReplyId,encodeURI(this.commentInpVal),this.classid).then(res => {
                	console.log(res)
                    if(res.success) {
                        this.topicCommentArr = []
                        this.initData()
                        this.cmShadowFn()
                        Toast({
                            message: this.targetReplyId > 0 ? '回复成功' : '评论成功'
                        })
                    } else {
                        Toast({
                            message: res.message
                        })
                    }
                    this.commentInpVal = ''
                })
            },
            toReply() {

            }
        },
        watch: {
            commentInpVal: function (val) {
                val !== '' ? this.isEmpty = false : this.isEmpty = true
            }
        },
        destroyed() {     //实例销毁后调用
    		//this.RESET_CLASS_TOPICINFO(null)
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .bottom-menu__wrap { position: absolute;bottom: 0 }
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
            background-color: #fff;
            position: relative;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
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
    .topic-comment-li {
        padding: .5rem;
        border-bottom: 1px solid #f2f2f2;
        .w-face-info img {
            @include wh(1.2rem, 1.2rem);
        }
    }
    .topic-comment-li:last-child {border: none;}
    .topic-comment__wrap {
        border-top: 5px solid #F5F6F8;
        margin-top: .9rem;
        .topic-comment-box {
            min-height: 6rem;
            position: relative;
        }
    }
    .topic-list-picture__wrap {
            .topic-list-picture-item {
                margin: .3rem 0 0 0;
                text-align: center;
                width: 100%;
                position: relative;
                overflow: hidden;
            .topic-l-picture {
                width: 100%;
                display: block;
            }
        }
    }
    .comment-inp__wrap {
        @include wh(9rem, 1.28rem);
        line-height: 1rem;
        background-color: #e8e8e8;
        border-radius: 2rem;
        margin-left: .5rem;
        padding: 0 .6rem;
    }
    .comment-inp {
        width: 82%;
        min-height: 1.28rem;
        line-height: 1rem;
        background-color: #e8e8e8;
        border-radius: 2rem;
        padding: 0 .6rem;
        font-size: .5rem;
        color: #222;
        text-align: left;
    }
    .comment-btn {
        background-color: transparent;
        color: #3e83e5;
    }
    .comment-btn[disabled='disabled'] { color: #89cef5 }
    .comment-shadow-bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 2rem;
        background-color: rgba(255,255,255,.4);
        z-index: 999;
    }
    .question-aq-txt__wrap {
        background-color: #f3f4f6;
        line-height: 1.08rem;
        padding-bottom: .3rem;
        .question-reply-item {
            padding: .3rem .5rem 0;
        }
    }
</style>
