<template>
    <div>
        <head-top head-title="推广中心" goBack="true"></head-top>
        <div class="main main-head">
            this is extend center home
        </div>
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
    		console.log(this.isExtender)
            console.log(this.userExtendInfo)
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
            	'isExtender', 'userExtendInfo'
            ])
        }
    }

</script>

<style lang="scss" scoped>

</style>
