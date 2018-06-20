<template>
    <div>
        <head-top isWhite="true" unSearchFlag="true">
            <section slot="search" class="top-search__wrap">
                <mt-search
                    v-model="searchVal"
                    cancel-text=""
                    placeholder="请输入关键字..."
                    @click.native="toSearchPage">
                </mt-search>
            </section>
        </head-top>
        <div class="main">
            <div class="mainChild-fixed">
                <nav class="top-navTab__wrap">
                    <section class="tab-title__wrap">
                        <div class="mint-navbar">
                            <a
                                :class="['mint-tab-item', {isSelected: currentTab === tab.key}]"
                                v-for="(tab, index) in tabs"
                                :key="tab.key"
                                @click="changeTab(tab.key, index)">
                                <div class="mint-tab-item-icon"></div>
                                <div class="mint-tab-item-label">{{ tab.txt }}</div>
                            </a>
                        </div>
                    </section>
                </nav>

                <article class="classes-list__wrap">
                    <keep-alive>
                        <component :is="currentTab"></component>
                    </keep-alive>
                </article>
            </div>
        </div>
        <foot-top></foot-top>
        <!--<transition name="router-search" mode="out-in">
            <router-view name="searchClass"></router-view>
        </transition>-->
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/header'
    import { Search, Button } from 'mint-ui'
    import footTop from '@/components/footer/footer'
    import allClass from '@/page/classes/index/allClass/allClass'
    import myClass from '@/page/classes/index/myClass/myClass'
    import myDynamic from '@/page/classes/index/myDynamic/myDynamic'
    export default {
    	data(){
            return{
                searchVal: '',                              //初始搜索关键字
                currentTab: 'all-class',
                tabs: [
                	{
                	    key: 'all-class',
                        txt: '全部'
                    },
                    {
                    	key: 'class-idxMy',
                        txt: '我的'
                    },
                    {
                    	key: 'class-dynamic',
                        txt: '动态'
                    }
                ],
            }
        },
        mounted() {
            let goActive = Number(this.$route.params.id)
            switch (goActive) {
                case 1:
                    this.currentTab = this.tabs[0].key
                	break;
                case 2:
                    this.currentTab = this.tabs[1].key
                    break;
                case 3:
                    this.currentTab = this.tabs[2].key
                    break;
            }
        },
        components: {
            headTop,
            Search,
            Button,
            footTop,
            'all-class': allClass,
            'class-idxMy': myClass,
            'class-dynamic': myDynamic,
        },
        computed: {
            ...mapState([
            	'login', 'userInfo'
            ])
        },
        methods: {
            toSearchPage() {
            	this.$router.push({name: 'searchClass', params: {focusState: true}})
            },
            changeTab(tab, idx) {
            	this.currentTab = tab
                this.$router.push({name: 'classIndex', params: {id: idx+1}})
            }
        },
        beforeRouteUpdate(to, from, next) {                             //路由更新 监听拦截登录
            if(to.params.id !== 1) {
                if(this.login && this.userInfo) {                       //vuex -> login状态判断
                    next()
                } else {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}                // 将跳转的路由path作为参数，登录成功后重定向到该路由
                    })
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../style/mixin";
    .mainChild-fixed {background-color: #fff}
    .top-navTab__wrap {
        @include wh(100%, 2rem);
        position: fixed;
        top: 40px;
        left: 0;
        right: 0;
        .mint-navbar .mint-tab-item {padding: 16px 0 17px;}
        .mint-tab-item-label { font-size: .6rem; }
    }
    .mint-navbar .mint-tab-item.isSelected { border-bottom: 3px solid #26a2ff;color: #26a2ff;margin-bottom: 0; }
    .classes-list__wrap {
        @include wh(100%, 100%);
        overflow-x: hidden;
        overflow-y: auto;
        section { position: relative; }
    }
    .router-search-enter-active, .router-search-leave-active {
        transition: all .4s;
    }
    .router-search-enter, .router-search-leave-active {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
    }
</style>
