<template>
    <div>
        <div class="mint-actionsheet" :class="mintActionshare ? '' : 'mintActionSharehide'">
            <ul class="mint-actionsheet-list">
                <li class="mint-actionsheet-listitem">
                    <section class="w-sharelist__wrap">
                        <a class="w-share-flex-item">QQ</a>
                        <a class="w-share-flex-item">微信</a>
                        <a class="w-share-flex-item">朋友圈</a>
                        <a class="w-share-flex-item" @click="inviterCardFn">邀请卡</a>
                    </section>
                </li>
            </ul>
        </div>
        <div class="v-modal" v-if="mintActionshare" @click="actionshareHideFn"></div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        components: {

        },
        props: ['mintActionshare'],
        methods: {
            inviterCardFn() {
                this.$emit('inviterCardFlagFn', [{'s': false, 'i': true}])
            },
            actionshareHideFn() {
                this.$emit('mintActionshareFn', false)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .v-modal {z-index: 2046}
    .mint-actionsheet {z-index: 2048}
    .mintActionSharehide {
        -webkit-transform: translate3d(-50%, 3rem, 0);
        transform: translate3d(-50%, 3rem, 0);
    }
    .w-sharelist__wrap {
        align-self: center;
        @include fj;
        .w-share-flex-item {
            flex: 1;
            text-align: center;
            padding: 0 .1rem;
            line-height: 1.8rem;
            @include sc(.8rem, #3e83e5)
        }
    }
</style>
