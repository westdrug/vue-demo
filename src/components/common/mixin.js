import { getStyle, isEmpty } from '../../config/wUtils'
/**
 * 滚动触底加载更多
 */
export const scrollLoad = {
    directives: {
        'scroll-load': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height,
                    height,
                    setTop,
                    paddingBottom,
                    marginBottom,
                    requestFram,
                    oldScrollTop,
                    scrollEl,
                    heightEl,
                    scrollType = el.attributes.type && el.attributes.type.value,   // 2：dom; 1：body
                    elHeight = 0,
                    scrollReduce = 2;

                if (scrollType == 2) {
                    scrollEl = el
                    heightEl = el.children[0]
                } else {
                    scrollEl = document.documentElement
                    heightEl = el
                }

                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;
                    if (scrollType == 2) height = height;
                    setTop = scrollType == 2 ? 0 : el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, false)

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false)

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, false)

                const moveEnd = () => {
                    requestFram = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop != oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd()
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }

                const loadMore = () => {
                    elHeight = scrollType == 1 ? windowHeight : scrollEl.clientHeight
                    if (scrollEl.scrollTop + elHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
                        binding.value();
                    }
                }

            }
        }
    }
}

/**
 * 自动获取焦点
 */
export const autoFocus = {
    directives: {
        focus: {
            update: function (el, {value}) {
                if(value) el.focus()
            }
        }
    }
}

/**
 * 滚动加载公共方法
 */
export const scrollLoadMoreFn = function (self, fn) {
    //防止重复请求
    if(self.preventRepeatReuqest) return

    self.preventRepeatReuqest = true
    self.hasRefresh = true

    if(self.currentPage === self.totalPage) {
        self.hasMore = false
        return
    }

    self.currentPage++
    if(self.currentPage <= self.totalPage) {
        self.hasMore = true
        fn()
    } else {
        self.hasMore = false
        return
    }
}

/**
 * string to array
 */
export const stringToArray = {
    methods: {
        stringToArray(str) {
            let reg = RegExp(/,/)
            if(isEmpty(str)) return
            if(str.match(reg)) {
                return str.split(',')
            } else {
                return [str]
            }
        }
    }
}

/**
 * 过虑返回数据中的 htmltag
 */
export const removeHtmlTag = {
    methods: {
        removeHtmlTag(msg) {
            var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
            msg = msg.replace(/[|]*\n/, '') //去除行尾空格
            msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
            return msg;
        }
    }
}
