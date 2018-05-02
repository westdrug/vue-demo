import { getStyle } from '../../config/wUtils'
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
                    setTop = el.offsetTop;
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
