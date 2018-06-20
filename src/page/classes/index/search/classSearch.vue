<template>
    <div class="rating_page">
        <head-top head-title="搜索班级" goBack="true" isWhite="true"></head-top>
        <header class="mint-header is-fixed whiteHead" style="background-color: transparent;top: 40px;">
            <form class="mint-header-title">
                <section class="top-search__wrap">
                    <div class="mint-search">
                        <div class="mint-searchbar">
                            <div class="mint-searchbar-inner">
                                <i class="mintui mintui-search"></i>
                                <input type="search" name="search" v-model.trim="searchValue" @blur="focusState = false" v-focus="focusState" placeholder="请输入关键字..." class="mint-searchbar-core">
                            </div>
                            <a class="mint-searchbar-cancel" @click.prevent="searchTarget('')">搜索</a>
                        </div>
                    </div>
                </section>
            </form>
        </header>
        <div class="main main-head" style="top: 80px;">
            <div class="rating_page__wrap">
                <div class="content-padded">
                    <section v-if="restaurantList.length">
                        有搜索结果，已返回数据
                    </section>
                    <!--搜索记录 开始 -->
                    <section class="search_history" v-if="searchHistory && showHistory">
                        <h4 class="hLh30"><span class="fs18 c-333">搜索历史</span></h4>
                        <ul>
                            <li v-for="(item, index) in searchHistory" :key="index" class="history_list">
                                <span class="history_text ellipsis fs14" @click="searchTarget(item)">{{item}}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                                    <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                                    <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                                </svg>
                            </li>
                        </ul>
                        <footer class="clear_history" v-if="searchHistory.length" @click="clearSearchHistory">清空搜索历史</footer>
                    </section>
                    <section class="pt5 tac" v-if="!searchHistory.length && showHistory">
                        <span class="fs14 c-999">暂无搜索记录</span>
                    </section>
                    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
                    <!--搜索记录 结束-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/header/header'
    import { autoFocus } from '@/components/common/mixin'
    import { setStore, getStore, removeStore } from '@/config/wUtils'
    import { getAllClass } from '@/service/getData'
    export default {
    	data(){
            return{
                searchValue: '',                    //搜索关键字
                focusState: null,                  //自动弹起输入框
                searchHistory: [],                //搜索历史记录
                showHistory: true,               // 是否显示历史记录，只有在返回搜索结果后隐藏
                restaurantList: [],              // 搜索返回的结果
                emptyResult: false,              // 搜索结果为空时显示
                userid: 0,
                currentPage: 1
            }
        },
        mounted() {
            this.focusState = this.$route.params.focusState
            //取store中的搜索记录
            if(getStore('searchHistory')) this.searchHistory = JSON.parse(getStore('searchHistory'))
            if(this.userInfo !== null && this.login) this.userid = this.userInfo.entity.id
        },
        components: {
            headTop
        },
        mixins: [autoFocus],
        methods: {
            //全部班级
            async getAllClassFn(keyWord) {
                await getAllClass(this.userid, keyWord, this.currentPage).then(res => {
                	if(res.success) {
                        if(res.entity) {
                            this.restaurantList = [...res.entity]
                            this.emptyResult = false
                        } else {
                            this.emptyResult = true
                        }
                    }
                })
            },
            searchTarget(historyVal) {
                if(historyVal) {
                	this.searchValue = String(historyVal)
                }
                if(!this.searchValue) return

                //隐藏搜索历史
                this.showHistory = false
                //获取搜索结果
                this.getAllClassFn(encodeURI(this.searchValue))

                //如果没有则新增，如果有则不做重复储存
                let history = getStore('searchHistory')
                if(history) {
                	let checkRepeat = false
                    this.searchHistory = JSON.parse(history)
                    this.searchHistory.find((item) => {

                        if(item === this.searchValue) {
                            checkRepeat = true
                            return
                        }
                    })

                    if(!checkRepeat) {
                        this.searchHistory.push(String(this.searchValue))
                    }

                } else {
                    this.searchHistory.push(String(this.searchValue))
                }

                setStore('searchHistory', this.searchHistory)
            },
            //删除单个
            deleteHistory(index) {
            	this.searchHistory.splice(index, 1)
                setStore('searchHistory', this.searchHistory)
                if(this.searchHistory === []) removeStore('searchHistory')
            },
            //清除搜索历史
            clearSearchHistory() {
                this.searchHistory = []
                removeStore('searchHistory')
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
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
            .sendTopic__wrap {
                border-top: 1px solid #e8e8e8;
                padding: .5rem;
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }
</style>
