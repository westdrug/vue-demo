<template>
    <div>
        <section class="pt5" v-if="files.length > 0">
            <aside class="clear tqImgWrap">
                <span v-for="(item, index) in files" :key="index">
                    <em class="close-em" @click="removeFile(index)">X</em>
                    <img :src="item.src" ondragstart="return false" height="50">
                </span>
            </aside>
        </section>
        <section class="pt5">
            <div class="fileUpload__wrap">
                <mt-button size="small" type="danger">选择图片</mt-button>
                <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
                <span class="fs12 c-danger ml5" v-if="limitTxt !== ''">{{limitTxt}}</span>
            </div>
        </section>
    </div>
</template>

<script>
    import { Button } from 'mint-ui'
    export default {
    	data(){
            return{
                files: [],                           //选择图片集合
                limitSize: 2048,                    //图片大小限制
                limitType: 'gif、jpg、jpeg、png',   //图片格式限制
                limitTxt: '',
            }
        },
        components: {
            Button
        },
        methods: {
            //选择文件
            fileChanged() {
                const list = this.$refs.file.files

                for(let i = 0; i < list.length; i++) {
                    //校验 是否重复，格式合法，大小限制内
                    if(!this.isContain(list[i])) {
                        if(this.isRangeSize(list[i]) && this.isRangeFormat(list[i])) {
                            const item = {
                                name: list[i].name,
                                size: list[i].size,
                                type: list[i].type,
                                file: list[i]
                            }
                            this.html5Reader(list[i], item)
                            this.files.push(item)
                        }
                    }
                }
                this.$refs.file.value = ''
                this.$emit('emitFiles', this.files)
            },
            //图片文件转base64格式
            html5Reader(file, item) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    let result = e.target.result
                    // 某些低版本的android浏览器中，读出来的base64缺少字节。
                    result = result.replace("data:;base64", "data:" + file.type + "base64");
                    this.$set(item, 'src', result)
                }
                reader.readAsDataURL(file)
            },
            //获取上传图片本地地址
            getObjectURL: function (file) {
                var url = null;
                if(window.createObjectURL  != undefined) {
                    url = window.createObjectURL(file);
                } else if(window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if(window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url
            },
            //筛选是否有重复
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            //校验图片大小
            isRangeSize(file) {
                let size = (file.size / 1024).toFixed(2)
                if(size > this.limitSize) {
                    this.limitTxt = `* 图片大小不能超过 ${this.limitSize} kb`
                    return	false
                } else {
                    this.limitTxt = ''
                    return true
                }
            },
            //检验图片格式
            isRangeFormat(file) {
                let type = file.type
                if(!new RegExp('(gif|jpg|jpeg|png)+', 'gi').test(type)) {
                    this.limitTxt = `* 请上传 ${this.limitType} 格式的图片`
                    return	false
                } else {
                    this.limitTxt = ''
                    return true
                }
            },
            //删除
            removeFile(idx) {
                this.files.splice(idx, 1)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .tqImgWrap {
        span {
            float: left;
            height: 50px;
            max-width: 80px;
            overflow: hidden;
            margin: 0 .5rem .5rem 0;
            display: block;
            position: relative;
            img {height: 50px;}
            .close-em {
                @include sc(.8rem, #999);
                font-style: normal;
                position: absolute;
                top: -5px;
                right: 0;
                z-index: 3;
            }
        }
    }
    .fileUpload__wrap {
        display: inline-block;
        position: relative;
        overflow: hidden;
        input[type='file'] {
            @include wh(100%, 100%);
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    }
</style>
