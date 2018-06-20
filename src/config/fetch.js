/**
 * url:    接口地址
 * data:   参数对象
 * type:   请求类型
 * method: 接口请求方法类型
 * ps:     fetch 是一个实验中的功能，此功能某些浏览器尚在开发中
*/

import { baseUrl, imgBaseUrl } from './env'
import md5 from './md5'
import { objKeySort } from './wUtils'
import Qs from 'qs'

export default async (url = '', data = {}, type = 'GET', isReq = 'isReq', method = 'fetch')=> {
    type = type.toUpperCase();
    url = isReq === 'isReq' ? baseUrl + url : imgBaseUrl + url;

    /*if(isReq !== 'isReq') {
        let formdata = new FormData()
        formdata.append('file', {uri: data.filePath, type: 'application/octet-stream', name: 'image.jpg'})
        console.log('999',formdata)
    }*/

    /*
     * 请求接口 传参验证
     * privateKey   授权密钥
     * sign        数据签名 接口参数排序并 拼接： key1|val1|key2|val2|.....
     * timestamps  时间截
     * */
    let pData = data
    let privateKey = 'YaIHNMXmx19560uE124SImc6Yyv85j943S7885M41Bs20v02L1oYY4b94QL3j72x9YfE37814h7092fGf9f054S6J83G1o3bT48I4p0s5KbS3Bd09A3q0C61vaL2audzr89Av258D5H32wr754d7Gzd0xe0D79zGd70703Iu642M5165VyyE3Lg4QF9524T956U4uR7HKZz0nYX236eC9von069nz7r7P'
    let objData = ''
    let timestamps = new Date().getTime()
    let n = 1

    pData['privateKey'] = privateKey
    pData['timestamps'] = timestamps

    let pKey = Object.keys(pData)
    let kLen = pKey.length
    let pDataSort = objKeySort(pData)

    for (let i in pDataSort) {
      (n == kLen) ? objData += i + '|' + pDataSort[i] : objData += i + '|' + pDataSort[i] + '|'
      n++
    }

    let sign = md5.hex_md5(objData)
    pDataSort['sign'] = sign

    if(type == 'GET') {
        let dataStr = '';   //数据拼接字符串
        Object.keys(pDataSort).forEach(key => {
            dataStr += key + '=' + pDataSort[key] + '&';
        })

        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
      let headerObj = isReq === 'isReq' ? {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'} : {'Content-Type': 'multipart/form-data;charset=utf-8'}
      let requestConfig = {
          credentials: 'include',  //cookie既可以同域发送，也可以跨域发送   发送cookie 时 需设置，解决方案： https://segmentfault.com/q/1010000008636959/a-1020000008640047
          method: type,
          headers: headerObj,
          mode: "core",      //实现跨域   默认是 same-origin , no-core ,core
          cache: "force-cache"
      }

      if (type == 'POST') {
          Object.defineProperty(requestConfig, 'body', {
            value: Qs.stringify(pDataSort)
          })
      }

      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
      } catch (error) {
        throw new Error(error)
      }
    } else {    //如不支持 fetch

      return new Promise((resolve, reject) => {
        let requestObj;
        if (window.XMLHttpRequest) {
          requestObj = new XMLHttpRequest();
        } else {
          requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
          sendData = JSON.stringify(pDataSort);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
          if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
              let obj = requestObj.response
              if (typeof obj !== 'object') {
                obj = JSON.parse(obj);
              }
              resolve(obj)
            } else {
              reject(requestObj)
            }
          }
        }
      })

    }
}
