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
                                <li @click="selectSubjectFn(0, 0)" :class="{active: currParent === 0}">全部</li>
                                <li v-for="(item, index) in majorArr" :key="item.id" :class="{active: currParent === index+1}" @click="selectSubjectFn(item.id, index+1)">{{item.subjectName}}</li>
                            </ul>
                        </section>
                        <section class="tab-right-menu">
                            <div v-if="subjectArr.length || currSubjectArr.length">
                                <div v-show="majorId === 0">
                                    <div class="content-padded subject-list__wrap">
                                        <mt-button plain size="small" :type="currChild === 0 ? 'primary' : 'default'" @click="selectChildFn(0, 0)">全部</mt-button>
                                        <mt-button plain size="small" :type="currChild === index+1 ? 'primary' : 'default'" v-for="(item, index) in subjectArr" :key="item.id" @click="selectChildFn(item.id, index+1)">{{item.subjectName}}</mt-button>
                                    </div>
                                </div>
                                <div v-show="majorId !== 0">
                                    <div class="content-padded subject-list__wrap">
                                        <mt-button plain size="small" :type="currChild === index ? 'primary' : 'default'" v-for="(item, index) in currSubjectArr" :key="item.id" @click="selectChildFn(item.id, index)">{{item.subjectName}}</mt-button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <un-data :num="3" :tipText="tipText"></un-data>
                            </div>
                        </section>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container2">
                        <section class="content-padded">
                            <!--<ul>
                                <li v-for="item in options" :key="item.key">
                                    <mt-checklist
                                        align="right"
                                        :value.sync="item.value"
                                        :options="item.option"
                                        @change="changeFn">
                                    </mt-checklist>
                                </li>
                            </ul>-->
                            <mt-checklist
                                v-model="currSortVal"
                                align="right"
                                :options="options" @change="changeFn">
                            </mt-checklist>
                        </section>
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
    import unData from './un-data'
    import { Navbar, TabItem, Button, Checklist, Toast } from 'mint-ui'
    import { subjectItem } from '@/service/getData'
    export default {
    	data(){
            return{
                tipText: '此专业下暂无科目',            //缺省提示文字
                selected: "",                         //选项切换选中
                filterOpen: false,                    //点击打开选项内容
                majorArr: null,                       //全部专业科目
                subjectArr: [],                       //全部子科目
                currSubjectArr: [],                   //当前专业下子科目
                majorId: 0,                           //专业ID
                currParent: 0,                        //当前专业
                currChild: 0,                         //当前科目
                currSortVal: ['0'],                      //
                options: [
                    {
                        label: '按默认排序',
                        value: '0'
                    },
                    {
                        label: '按上架时间排序',
                        value: '1'
                    },
                    {
                        label: '按价格排序',
                        value: '2'
                    }
                ]
            }
        },
        mounted() {
    	    this.initData()
        },
        components: {
            Navbar,
            TabItem,
            Button,
            Checklist,
            unData,
            Toast
        },
        methods: {
    		//专业科目
            async initData() {
            	await subjectItem().then(res => {
                    if(res.success) {
                    	if(res.entity) {
                    		this.majorArr = [...res.entity]

                            this.majorArr.forEach(item => {
                                item.childSubjectList.forEach(item => {
                                    this.subjectArr.push(item)
                                })
                            })
                        }
                    } else {
                        Toast({
                            message: res.message,
                            position: 'middle',
                            duration: 5000
                        })
                    }
                })
            },
            //关闭筛选下拉
            hideFilterFn() {
            	this.selected = ''
            	this.filterOpen = false
            },
            //选择分类左侧专业后，右侧渲染对应子科目
            selectSubjectFn(id, index) {
            	this.majorId = id
                this.currParent = index
                this.currSubjectArr.length = 0

                this.subjectArr.forEach(item => {
                	if(item.parentId === id) this.currSubjectArr.push(item)
                })
            },
            //选择分类右侧科目后
            selectChildFn(id, index) {
            	this.$emit('subjectEvent', id)   //子组件向父组件传值
                this.currChild = index
                this.hideFilterFn()
            },
            //选择排序
            changeFn() {
            	console.log('....', this.currSortVal)
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
    .subject-list__wrap .mint-button {
        margin: .5rem .2rem 0;
    }
    .subject-list__wrap .mint-button--default {
        border-color: #f2f2f2;
    }
</style>
