<template>
    <div>
        <div class="filter-tab__wrap">
            <mt-navbar v-model="selected" class="filter-tab">
                <mt-tab-item id="tab-container1" class="filter-tab-link">分类 <i class="mint-cell-allow-right"></i></mt-tab-item>
                <mt-tab-item id="tab-container2" class="filter-tab-link">排序 <i class="mint-cell-allow-right"></i></mt-tab-item>
                <mt-tab-item id="tab-container3" class="filter-tab-link">筛选 <i class="mint-cell-allow-right"></i></mt-tab-item>
            </mt-navbar>
        </div>
        <div class="wm-cl__wrap" :class="filterOpen ? 'filterOpen' : ''">
            <div class="filter-cont__wrap">
                <mt-tab-container v-model="selected" value="tab-container1">
                    <mt-tab-container-item id="tab-container1">
                        <section class="tab-left-nav">
                            <ul>
                                <li data-subject="1" class="active">滑雪</li>
                                <li data-subject="4" class="">法学</li>
                                <li data-subject="16" class="">会计</li>
                                <li data-subject="33" class="">一级建造师</li>
                                <li data-subject="44" class="">二级建造师</li>
                                <li data-subject="71" class="">区块链</li>
                                <li data-subject="75" class="">经济学</li>
                                <li data-subject="112" class="">法律</li>
                                <li data-subject="123" class="">语言</li>
                                <li data-subject="177" class="">哲学</li>
                            </ul>
                        </section>
                        <section class="tab-right-menu">
                            aaa
                        </section>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container2">
                        22222
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container3">
                        33333
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
            <div class="modal-overlay" @click="hideFilterFn"></div>
        </div>
    </div>
</template>

<script>
    import { Navbar, TabItem } from 'mint-ui'
    export default {
    	data(){
            return{
                selected: "",               //选项切换选中
                filterOpen: false           //点击打开选项内容
            }
        },
        component: {
            Navbar,
            TabItem
        },
        methods: {
            hideFilterFn() {
            	this.selected = ''
            	this.filterOpen = false
            }
        },
        watch: {
            selected(value) {
            	let body = document.querySelector('body')
            	if(value === 'tab-container1' || value === 'tab-container2' || value === 'tab-container3') {
                    this.filterOpen = true
                    body.setAttribute('class', 'hidden')
                } else {
            		this.filterOpen = false
                    body.setAttribute('class', '')
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";
    .filter-tab__wrap {
        @include wh(100%, 2rem);
        position: fixed;
        top: 40px;
        left: 0;
        right: 0;
        .filter-tab {
            background: white;
            position: relative;
            flex-wrap: nowrap;
            display: flex;
            align-self: center;
            .filter-tab-link {
                display: block;
                text-align: center;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 0 .5rem;
                position: relative;
                white-space: nowrap;
                text-overflow: ellipsis;
                @include wh(100%, 2rem);
                cursor: pointer;
            }
        }
    }
    .filter-tab::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: auto;
        top: auto;
        @include wh(100%, 1px);
        background-color: #e4e4e4;
        display: block;
        z-index: 15;
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
    }
    .filter-tab-link::before {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        @include wh(1px, 100%);
        content: '';
        background-color: #e4e4e4;
    }
    .filter-tab-link:last-child::before {
        display: none;
    }
    .filter-cont__wrap {
        background-color: #fff;
        position: absolute;
        width: 100%;
        height: auto;
        bottom: 20%;
        top: 0;
        z-index: 10800;
    }
    .wm-cl__wrap {
        opacity: 0;
        visibility: hidden;
    }
    .wm-cl__wrap.filterOpen,
    .wm-cl__wrap.filterOpen .modal-overlay {
        opacity: 1;
        visibility: visible;
    }
    .tab-left-nav,
    .tab-right-menu {
        float: left;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .tab-left-nav {
        background-color: #F8F9FD;
        width: 23%;
        text-align: center;
        li {
            cursor: pointer;
            line-height: 2.0rem;
            border-bottom: 1px solid #f0f2f7;
            margin-right: -1px;
            font-size: .52rem;
            color: #888;
            position: relative;
        }
        li.active {
            background-color: #fff;
            color: #333;
        }
        li.active::before {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            height: 100%;
            content: '';
            background-color: #3e83e5;
        }
    }
    .tab-right-menu {
        background-color: #fff;
        width: 77%;
    }
</style>
