<template>
    <div>
        <head-top head-title="选课"></head-top>
        <div class="main">
            <div class="mainChild-fixed">
                <filter-top
                    @subjectEvent="subjectEvent"
                    @cTypeEvent="cTypeEvent"
                    @cYearEvent="cYearEvent">
                </filter-top>
                <course-list
                    :priceOrderBy="priceOrderBy"
                    :updateTimeOrderBy="updateTimeOrderBy"
                    :courseName="courseName"
                    :subjectId="subjectId"
                    :year="year"
                    :courseTypeKey="courseTypeKey">
                </course-list>
            </div>
        </div>
        <foot-top></foot-top>
    </div>
</template>

<script>
    import headTop from '@/components/header/header'
    import filterTop from '@/components/common/filter'
    import courseList from '@/components/common/course-list'
    import footTop from '@/components/footer/footer'
    export default {
    	data(){
            return{
                priceOrderBy: 0,                                //价格升降序 1，3
                updateTimeOrderBy: 0,                           //时间升降序 2，4
                courseName: '',                                 //课程名称
                subjectId: 0,                                   //专业 ID
                year: '',                                       //年份
                courseTypeKey: '',                              //课程类型
            }
        },
        mounted() {
        },
        components: {
            headTop,
            filterTop,
            courseList,
            footTop
        },
        methods: {
            subjectEvent(data) {
            	this.subjectId = data
            },
            cTypeEvent(data) {
                this.courseTypeKey = data
            },
            cYearEvent(data) {
            	this.year = data
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
