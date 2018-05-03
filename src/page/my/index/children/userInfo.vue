<template>
    <div class="rating_page">
        <head-top head-title="个人资料" goBack="true"></head-top>
        个人资料
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/header'
    export default {
    	data(){
            return{

            }
        },
        mounted() {
    	    console.log(this.userInfo)
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
            	'userInfo'
            ])
        }

    }

</script>

<style lang="scss" scoped>
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F5F6F8;
        z-index: 202;
        padding-top: 1.95rem;
    }
</style>
