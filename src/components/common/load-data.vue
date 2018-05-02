<template>
    <div v-if="hasRefresh">
        <div v-if="hasMore" class="loading"><span>&nbsp;</span></div>
        <div v-else class="empty_data"><span class="fs12 c-999">口rz~  别扯了，真没有啦~~~</span></div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        props: ['hasRefresh', 'hasMore']
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .empty_data, .loading {
        text-align: center;
        line-height: 2rem;
    }
    .loading > span {
        margin-top: .8rem;
        display: inline-block;
        @include wh(1.0rem, 1.0rem)
        @include bis('https://res.268xue.com/res/static/front/mobile/v3/img/default/loading.gif')
    }
</style>
