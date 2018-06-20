<template>
    <div class="rating_page">
        <head-top head-title="发表话题" cancel="true" isWhite="true">
            <span slot="edit">
                <span class="fs16 c-info" @click="submitTopic">发表</span>
            </span>
        </head-top>
        <div class="main main-head">
            <div class="rating_page__wrap">
                <article class="sendTopic__wrap">
                    <section class="pt5">
                        <input v-model.trim="title" maxlength="40"  class="inp-control" type="text" placeholder="话题标题，不要超过40个字符">
                    </section>
                    <section class="pt5">
                        <textarea v-model.trim="context" maxlength="5000" class="inp-control" style="font-size: .54rem;min-height: 4.8rem;" placeholder="话题正文，最多不超过5000个字"></textarea>
                    </section>
                    <section class="pt5">
                        <div class="mint-cell mint-field">
                            <div class="mint-cell-wrapper">
                                <div class="mint-cell-title">
                                    <span class="fs14 c-666">话题类型</span>
                                    <br>
                                    <span class="fs14 c-666">浏览权限</span>
                                </div>
                                <div class="mint-cell-value">
                                    <section class="picker-fixed__wrap">
                                        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                    <uploader @emitFiles="emitFiles"></uploader>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/header'
    import uploader from '@/components/common/uploader'
    import { Picker, Toast, Indicator } from 'mint-ui'
    import { uploadFile } from '@/service/getData'
    export default {
    	data(){
            return{
                slots: [
                    {
                        flex: 0.2,
                        values: ['原创', '讨论', '疑问', '活动', '其它'],
                        className: 'slot1',
                        textAlign: 'left'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 0.4,
                        values: ['自由浏览', '登录后浏览', '仅本班学员浏览'],
                        className: 'slot3',
                        textAlign: 'left'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    }, {
                        flex: 0.4,
                        values: ['自由评论','仅本班学员评论'],
                        className: 'slot5',
                        textAlign: 'left'
                    }
                ],
                files: null,                              //图片集合
                typeName: null,
                replyPermission: null,
                lookPermission: null,
                classid: null,
                topicImages: null,
                title: null,
                context: null,
                userid: null
            }
        },
        mounted() {
    	    this.userid = this.userInfo.entity.id
            this.classid = this.classDetail[0].id
        },
        components: {
            headTop,
            uploader,
            Picker,
            Toast
        },
        computed: {
            ...mapState([
            	'userInfo', 'classDetail'
            ])
    	},
        methods: {
    		//获取话题类型、浏览、观看权限
            onValuesChange(picker, values) {
                this.typeName = values[0]
                this.replyPermission = values[1]
                this.lookPermission = values[2]
            },
            //接收子组件传来的图片集合
            emitFiles: function (arr) {
                this.files = arr
            },
            //提交
            submitTopic() {

            	if(this.title === '' || this.title === null) {
            		Toast({
                        message: '标题不能为空！',
                        position: 'top',
                        duration: 3000
                    })
                    return
            	}
            	if(this.context === '' || this.context === null) {
                    Toast({
                        message: '话题正文不能为空！',
                        position: 'top',
                        duration: 3000
                    })
                    return
                }

                //先上传文件再提交话题
                let promise = new Promise((resolve, reject) => {
                    Indicator.open({
                        text: '提交中...',
                        spinnerType: 'fading-circle'
                    })
            		let imgArr = [],
                        imgUpload = (callback) => {
                    	    if(this.files.length > 0) {
                                this.files.forEach((item) => {
                                    //上传文件至图片服务器
                                    uploadFile(this.userid, item.src).then(res => {
                                        console.log('.....', res)
                                    })
                                })
                            } else {
                    	    	resolve('')
                            }
                        }

                    imgUpload((res) => {
                    	resolve(imgArr)
                    })

                })

                promise.then((val) => {
            		console.log(val)
                    Indicator.close()
                })

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
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
            background-color: #fff;
            position: relative;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            .sendTopic__wrap {
                border-top: 1px solid #e8e8e8;
                padding: .5rem;
            }
        }
    }
    .inp-control {
        @include sc(.62rem, #333);
        width: 100%;
        min-height: 1.6rem;
        border-bottom: 1px solid #e2e2e2;
        padding-bottom: .5rem;
    }
</style>
