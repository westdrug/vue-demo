<template>
    <div class="myClass-list__wrap">
        <div class="courseList_container">
            <ul v-if="myClassArr.length > 0">
                <li class="course_li" v-for="item in myClassArr" :key="item.id">
                    <section>
                        <img class="course_img" :alt="item.className" v-lazy="item.imageMap.mobileUrlMap.large">
                    </section>
                    <hgroup class="course_right">
                        <h4 class="course_title_ellipsis">{{item.className}}</h4>
                        <section class="course_attr">
                            <span class="fs12 c-999">{{item.classInfo}}</span>
                        </section>
                        <section class="course_attr">
                            <span class="fs12 c-999">{{item.topicNum}}</span>
                            <span class="fs12 c-999 ml5">{{item.userNum}}</span>
                        </section>
                    </hgroup>
                    <aside class="item-after">
                        <span @click="depositClassInfo(item.id)">
                            <router-link :to="{path: '/classDetail', query: {id: item.id}}">
                                <mt-button size="small" type="danger">查看</mt-button>
                            </router-link>
                        </span>
                    </aside>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <un-data :num="2" :tipText="tipText1"></un-data>
                </li>
            </ul>
        </div>
        <transition name="loading">
            <loading v-if="showLoading" :hideBg="true"></loading>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import loading from '@/components/common/loading'
    import unData from '@/components/common/un-data'
    import { getMyClass } from '@/service/getData'
    export default {
    	data(){
            return{
                showLoading: true,                           //显示加载动画
                tipText1: '暂无班级，小编正在整理上传中...',   //缺省提示
                userid: 0,
                myClassArr: [],
                currentPage: 1,
                totalPage: 0
            }
        },
        mounted() {
            if(this.userInfo !== null) this.userid = this.userInfo.entity.id
            this.initData()
        },
        components: {
            loading,
            unData
        },
        computed: {
            ...mapState([
            	'userInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'RESET_CLASS_DETAIL'
            ]),
    		async initData() {
    			await getMyClass(this.userid, this.currentPage).then(res => {
                    if(res.success) {
    					if(res.entity) {
    						this.myClassArr = [...this.myClassArr, ...res.entity]
                            this.showLoading = false
                        }
                    }
                })
            },
            depositClassInfo(id) {
    			if(this.myClassArr.length <=0 ) return
                let currClassObj = this.myClassArr.filter((item) => {
    				return item.id === id
                })

                this.RESET_CLASS_DETAIL(currClassObj)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .myClass-list__wrap {
        min-height: 100%;
        position: relative;
    }
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
    @include wh(2.4rem, 2.4rem);
    @include borderRadius(50%);
        margin-right: .5rem;
    }
    .course_right {
        flex: auto;
        padding-right: .1rem;
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
    .item-after {
        flex: .5;
        a {
            .mint-button {width: 3rem;}
        }
    }
</style>
