<template>
    <div>
        <head-top head-title="选课" goBack="true"></head-top>
        <div class="main">
            <course-list></course-list>
        </div>
        <foot-top></foot-top>
    </div>
</template>

<script>
    import headTop from '@/components/header/header'
    import courseList from '@/components/common/course-list'
    import footTop from '@/components/footer/footer'
    export default {
    	data(){
            return{
            }
        },
        components: {
            headTop,
            courseList,
            footTop
        }
    }

</script>

<style lang="scss" scoped>

</style>
