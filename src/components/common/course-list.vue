<template>
    <div class="courseList_container">
        <ul v-if="courseList.length" v-scroll-load="scrollLoadMore" type="1">
            <router-link :to="{name: 'courseInfo', params: {courseId: item.id}}" class="course_li" v-for="item in courseList" tag="li" :key="item.id">
                <section>
                    <img :alt="item.courseName" class="course_img" v-lazy="item.imageMap.mobileUrlMap.small">
                </section>
                <hgroup class="course_right">
                    <h4 class="course_title_ellipsis">{{item.courseName}}</h4>
                    <div class="course_attr">
                        <span class="fs12 c-999">{{item.teacherList[0].teacherName}}</span>
                        <span class="fs12 c-999">{{item.buyCount}}</span>
                    </div>
                    <div class="course-attr">
                        <span class="fs12 c-danger">￥</span>
                        <strong :class="item.realPrice > 0 ? 'c-danger' : 'c-success'" class="fs16">{{item.realPrice > 0 ? item.realPrice : '免费'}}</strong>
                    </div>
                </hgroup>
            </router-link>
        </ul>
        <ul v-else>
            <li><un-data :num="1" :tipText="tipText"></un-data></li>
        </ul>
        <load-data :hasRefresh="hasRefresh" :hasMore="hasMore"></load-data>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from '@/components/common/loading'
    import unData from '@/components/common/un-data'
    import loadData from '@/components/common/load-data'
    import { getAllCourse } from '@/service/getData'
    import { Lazyload } from 'mint-ui'
    import { scrollLoad } from '@/components/common/mixin'
    export default {
    	data(){
            return{
                tipText: '暂无数据，小编正在整理中...',            //缺省提示文字
                courseList: [],                                 //课程列表数据
                showLoading: true,                              //加载动画
                totalPage: 1,                                   //总页码
                currentPage: 1,                                 //当前页码
                form: 2,                                        //来源
                hasRefresh: false,                              //加载状态显示
                hasMore: false,                                 //加载动画
                preventRepeatReuqest: false                     //到达底部加载数据，防止重复加载
            }
        },
        mounted() {
    		this.initData()
        },
        components: {
            loading,
            unData,
            loadData
        },
        props: ['priceOrderBy','updateTimeOrderBy','courseName','subjectId','year','courseTypeKey'],
        mixins: [scrollLoad],
        methods: {
    		async initData() {
                await getAllCourse(this.currentPage, this.priceOrderBy, this.updateTimeOrderBy, this.courseName, this.subjectId, this.year, this.courseTypeKey, this.form).then(res => {
                    if(res.entity.data) {
                        this.courseList = [...this.courseList, ...res.entity.data]
                    }
                    this.totalPage = res.entity.page.totalPages
                    this.showLoading = false
                }).then(() => {
                    this.preventRepeatReuqest = false
                })
    		},
            async scrollLoadMore() {

    			//防止重复请求
    			if(this.preventRepeatReuqest) return

                this.preventRepeatReuqest = true
    			this.hasRefresh = true

                if(this.totalPage === this.currentPage) {
    				this.hasMore = false
                    return
                }

                this.currentPage++
                if(this.currentPage <= this.totalPage) {
                    this.hasMore = true
                    this.initData()
                } else {
                    this.hasMore = false
                    return
                }

            }
        },
        watch: {
    		//兼听父组件传来 subjectId，当值发生变化时重新获取课程数据，用于分类筛选
            subjectId: function (value) {
                //console.log('id', value)
                this.courseList.length = 0
                this.initData()
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .courseList_container {
        margin-bottom: 2rem;
    }
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
</style>
