/**
 * @name 配置公共方法
 * @params{*}:params
 *
 */

const localStore = window.localStorage

/**
 * 存储 localStorage
 * name:    string key
 * content  string data
 */
export const setStore = (name, content) => {
    if(isEmpty(name)) return
    if(content instanceof Object) {
        content = JSON.stringify(content)
    }
    localStore.setItem(name, content)
}

/**
 * 获取 localStorage
 * name:    string key
 */
export const getStore = name => {
    if(isEmpty(name)) return
    return localStore.getItem(name)
}

/**
 * 删除 localStorage
 * name:    string key
 */
export const removeStore = name => {
    if(isEmpty(name)) return
    localStore.removeItem(name)
}

/**
 * 是否为空
 * str:    string
 */
export const isEmpty = function (str) {
  if (str === null || typeof str === 'undefined' || str === '') {
    return true
  }
  return false
}

export const isNotEmpty = function (str) {
  return !isEmpty(str)
}

/**
 * 数组连接
 * 使用 es6 展开运算符更方便： [...arr1,...arr2]
 */
export const arrayConcat = function (arr, arr1) {
  arr.push.apply(arr, arr1)
  return arr
}

/**
 * 时间戳
 */
export const timeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + ''
}

/**
 * 随机数
 */
export const randomString = function () {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const toNumber = function (val) {
  var n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * 对象 key 排序
 */
export const objKeySort = (arys) => {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newkey = Object.keys(arys).sort();
  //console.log('newkey='+newkey);
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对

  }
  return newObj; //返回排好序的新对象
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  }else if(element.currentStyle){
    target = element.currentStyle[attr];
  }else{
    target = document.defaultView.getComputedStyle(element,null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

/**
 * 缺省图标
 */
export const defaultPictureFn = (num) => {
    let picUrl = ''
    switch (num) {
        case 1:    //无评论、反馈 数据时
            picUrl = '/res/static/front/mobile/v3/img/default/comment-none.png'
            break;
        case 2:    //无订单 数据时
            picUrl = '/res/static/front/mobile/v3/img/default/order-none.png'
            break;
        case 3:    //无账户 数据时
            picUrl = '/res/static/front/mobile/v3/img/default/account-none.png'
            break;
        case 4:    //无优惠卡、券 数据时
            picUrl = '/res/static/front/mobile/v3/img/default/card-none.png'
            break;
        case 5:    //无通知公告 数据时
            picUrl = '/res/static/front/mobile/v3/img/default/message-none.png'
            break;
        default:    //公共无数据时
            picUrl = '/res/static/front/mobile/v3/img/default/data-none.png'
            break;
    }

    return picUrl
}

/**
 * 格式化时间戳
 */
export const formatTime = function (date, format = '', conn = '-') {

  if (new Date(date) == 'Invalid Date') {
    date = parseDate(date)
  } else {
    date = new Date(date)
  }

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (format == '') {
    return [year, month, day].map(formatNumber).join(conn) + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (format == 'YY-MM-DD') {
    return [year, month, day].map(formatNumber).join(conn)
  } else if (format == 'YY-MM-DD HH:mm') {
    return [year, month, day].map(formatNumber).join(conn) + ' ' + [hour, minute].map(formatNumber).join(':')
  } else if (format == 'YY-MM-DD HH:mm:ss') {
    return [year, month, day].map(formatNumber).join(conn) + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (format == 'YYMMDD') {
    return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日'
  }
}



