<template>
    <div class="rating_page">
        <head-top head-title="修改姓名" goBack="true">
            <span slot="edit" @click="saveRealName">保存</span>
        </head-top>
        <section class="rating_page__wrap">
            <div class="hLh30"></div>
            <mt-field label="昵称" placeholder="请输入真实姓名" v-model="realName"></mt-field>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/header'
    import { Field } from 'mint-ui'
    export default {
    	data(){
            return{
                realName: null
            }
        },
        components: {
            headTop,
            Field
        },
        methods: {
            ...mapMutations([
            	'RESET_NAME'
            ]),
    		async saveRealName() {
    			//console.log(this.realName)
                //console.log(this.$store.state.userInfo)
                this.RESET_NAME(this.realName)
                this.$router.go(-1)
            }
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
        padding-top: 40px;
        .rating_page__wrap {
            position: relative;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
