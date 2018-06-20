<template>
    <div>
        <div class="page-loading">
            <span class="icon-loading vam"></span>
            <span class="fs14 c-666" style="vertical-align: text-top">努力奔跑中...</span>
            <span class="c-999" style="font-size: 10px;position: relative;left: 42px;top: -24px;">Powered by 268教育软件</span>
        </div>
        <section class="back_svg_container" v-if="!hideBg">
            <div class="back_svg"></div>
        </section>
        <section class="back_white_bg" v-else></section>
    </div>
</template>

<script>
    export default {
    	data() {
            return {}
        },
        props: ['hideBg']
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .page-loading {
        @include wh(6rem, 1.6rem)
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 7;
    }
    .icon-loading {
        background: url(https://res.268xue.com/res/static/front/mobile/v3/img/default/loading.gif) no-repeat 0 0;
        background-size: cover;
        display: inline-block;
        @include wh(1.4rem, 1.4rem);
    }
    .back_svg_container {
        position: fixed;
        top: -5px;
        @include wh(100%, 100%);
        .back_svg {
            @include wh(100%, 100%);
            background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg==)
        }
    }
    .back_white_bg {
        background-color: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        @include wh(100%, 100%);
        @include cl;
        z-index: 3
    }

</style>
