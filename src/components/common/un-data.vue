<template>
    <div class="no-data__wrap">
        <img :src="imgBaseUrl + defaultPictureFn(num)" alt="无数据">
        <section v-if="tipText">
            <span class="fs14 c-999">{{tipText}}</span>
        </section>
        <section v-else>
            <span class="fs16 c-999">亲，内容好像飞走了~~~</span>
        </section>
    </div>
</template>

<script>
    import { imgBaseUrl } from '@/config/env'
    import { defaultPictureFn } from '@/config/wUtils'
    export default {
    	data(){
            return{
                imgBaseUrl,
                defaultPictureFn
            }
        },
        props: ['num', 'tipText']
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .no-data__wrap {
        padding: 3rem 2rem 2rem;
        text-align: center;
        img {
            @include wh(3.8rem, 3.8rem)
        }
    }
</style>
