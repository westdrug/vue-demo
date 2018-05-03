<template>
    <div>
        <head-top head-title="选课" goBack="true"></head-top>
        <div class="main">
            <div class="mainChild-fixed">
                <filter-top></filter-top>
                <course-list></course-list>
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
            }
        },
        components: {
            headTop,
            filterTop,
            courseList,
            footTop
        }
    }

</script>

<style lang="scss" scoped>
    .mainChild-fixed {
        position: relative;
        margin-top: 2rem;
        height: calc(100% - 2rem);
    }
</style>
