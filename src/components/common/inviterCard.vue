<template>
    <div v-if="inviterCardFlag">
        <div class="inviter-card__wrap">
            <article class="inviter-card-box">
                <aside id="qrcode" class="qrcode"></aside>
                <img :src="cImg" ref="cImg" class="cImg" crossOrigin="anonymous">
                <img :src="tImg" ref="tImg" class="tImg" crossOrigin="anonymous">
                <canvas id="cardCanvas" class="cardCanvas" width="380" height="438">
                    <span class="fs12">你的浏览器不支持canvas画布</span>
                </canvas>
                <section id="canvasToImg__wrap" class="canvasToImg__wrap"></section>
            </article>
        </div>
        <div class="v-modal"></div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    export default {
    	data(){
            return{
                cUrl: null,                //推广课程对象
                cImg: '',                  //推广课程封面
                cTxt: '',                  //推广课程标题
                tImg: '',                  //课程讲师头像
                tTxt: '',                  //课程讲师名称
                cShare: '',                //推广课程地址
            }
        },
        mounted() {

        },
        props: ['inviterCardFlag', 'currCourseShare'],
        watch: {
            currCourseShare: function (val) {
                this.cUrl = val
                this.assignment()
            }
        },
        updated: function () {
            this.$nextTick(function () {
            	//生成分享二维码
                let c = document.querySelector('#cardCanvas'),
                    ctx = c.getContext("2d")

                let promise = new Promise((next, error) => {
                    //生成分享二维码
                    let qrcode = new QRCode('qrcode', {
                        width: 120,
                        height: 120,                                      // 高度
                        text: this.cShare,                               // 二维码内容
                        colorDark : '#398ae6',                          // 前景色
                        colorLight : '#ffffff'                          // 背景色
                        //correctLevel : QRCode.CorrectLevel.H    // 容错级别
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    })

                    let baseImg = qrcode._el.childNodes[1]
                    next(baseImg)

                })

                promise.then((val) => {
                    //生成canvas画布，并画图
                    let codeimg = val,
                        cimg = this.$refs.cImg

                    codeimg.crossOrigin = "Anonymous"

                    codeimg.onload = function () {
                        ctx.drawImage(codeimg, 235, 285, 120, 120)
                    }

                    return cimg

                }).then((data) => {
                    let cimg = data,
                        timg = this.$refs.tImg

                    cimg.crossOrigin = "Anonymous"
                    cimg.onload = function () {
                        ctx.drawImage(cimg, 0, 0, 380, 214)
                    }

                    return timg

                }).then((data) => {
                	let timg = data

                    timg.crossOrigin = "Anonymous"
                    timg.onload = function () {
                        ctx.drawImage(timg, 20, 310, 38, 38)
                    }

                    return document.querySelector('#canvasToImg__wrap')

                }).then((data) => {
                	let _ct = data

                    //canvas文本自动换行
                    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
                        if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
                            return;
                        }

                        var context = this;
                        var canvas = context.canvas;

                        if (typeof maxWidth == 'undefined') {
                            maxWidth = (canvas && canvas.width) || 300;
                        }
                        if (typeof lineHeight == 'undefined') {
                            lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
                        }

                        // 字符分隔为数组
                        var arrText = text.split('');
                        var line = '';

                        for (var n = 0; n < arrText.length; n++) {
                            var testLine = line + arrText[n];
                            var metrics = context.measureText(testLine);
                            var testWidth = metrics.width;
                            if (testWidth > maxWidth && n > 0) {
                                context.fillText(line, x, y);
                                line = arrText[n];
                                y += lineHeight;
                            } else {
                                line = testLine;
                            }
                        }
                        context.fillText(line, x, y);
                    }

                    ctx.rect(0, 0 , 380, 438)
                    ctx.fillStyle = "#FFFFFF"
                    ctx.fill()

                    ctx.font = '18px Microsoft YaHei'
                    ctx.fillStyle="#222222"
                    ctx.wrapText(this.cTxt, 20, 250, 300, 24)

                    ctx.font = '16px Microsoft YaHei'
                    ctx.fillStyle="#999999"
                    ctx.fillText(this.tTxt, 70, 335)

                    ctx.font = '14px Microsoft YaHei'
                    ctx.fillStyle="#666666"
                    ctx.fillText('[ 长按扫码查看详情 ]', 20, 400)

                    //canvas转图片
                    _ct.appendChild(this.convertCanvasToImage(c))
                })

            })
        },
        methods: {
    		assignment() {
    			if(this.cUrl.length === 1) {
                    this.cImg = this.cUrl[0].imageMap.mobileUrlMap.large
                    this.cTxt = this.cUrl[0].courseName
                    this.tImg = this.cUrl[0].teacherList[0].imageMap.mobileUrlMap.large
                    this.tTxt = this.cUrl[0].teacherList[0].teacherName
                    this.cShare = this.cUrl[0].shareUrl
                }
            },
            convertCanvasToImage(canvas) {
    			let img = new Image()
                img.setAttribute('crossOrigin', 'anonymous')
                img.src = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

                return img
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .inviter-card__wrap {
        @include wh(100%, 70%);
        @include center;
        z-index: 9999;
        .inviter-card-box {
            position: relative;
            @include wh(100%, 100%);
            .cImg, .tImg, .qrcode {
                position: absolute;
                top: -99rem;
            }
            .canvasToImg__wrap {
                @include wh(380px, 438px)
            }
        }
    }
    .v-modal {z-index: 9998}
</style>
