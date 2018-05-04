/**
 * 数据接口
 */

import fetch from '../config/fetch'

const USER_HOST = 'userApi'         //用户

const COURSE_HOST = 'courseApi'     //课程

const ORDER_HOST = 'orderApi'       //订单

const CLASSIFY_HOST = 'sysApi'      //专业

const AGENT_HOST = 'agentApi'       //分销

const OP_HOST = 'opApi'            //广告\消息\优惠券\礼品卡

const EXAM_HOST = 'examApi'        //考试

/*
* 首页banner
* */
export const bannerIndex = () => fetch(`${OP_HOST}/api/advert/ajax/advertList`, {}, 'POST');

/**
 * 课程目录
 */
export const courseMenu = (courseid) => fetch(`${COURSE_HOST}/api/course/getCourseCatalogByCourseId`, {
    courseId: courseid
}, 'POST');

/**
 * 用户登录
 */
export const accountLogin = (account, userPassword) => fetch(`${USER_HOST}/api/user/login`, {
    account: account,
    userPassword: userPassword
}, 'POST')
/**
 * 获取用户信息
 */
export const getUserInfo = (userid) => fetch(`${USER_HOST}/api/user/center/getUserInfo`, {
    userId: userid
}, 'POST')
/**
 * 专业科目
 */
export const subjectItem = () => fetch(`${CLASSIFY_HOST}/api/sys/subject/list`, {}, 'POST')
/**
 * 课程列表
 */
export const getAllCourse = (currentPage, priceOrderBy, updateTimeOrderBy, courseName, subjectId, year, courseTypeKey, form) => fetch(`${COURSE_HOST}/api/course/getAllCourseList`, {
    'page.currentPage': currentPage,
    priceOrderBy: priceOrderBy,
    updateTimeOrderBy: updateTimeOrderBy,
    courseName: courseName,
    subjectId: subjectId,
    year: year,
    courseTypeKey: courseTypeKey,
    form: form
}, 'POST')
/**
 * 课程详情
 */
export const getCourseDetail = (userid, courseid, orderNo) => fetch(`${COURSE_HOST}/api/course/getCourseInfoById`, {
    userId: userid,
    courseId: courseid,
    orderNo: orderNo
}, 'POST')
/**
 * 课程目录
 */
export const getCourseMenu = (courseid) => fetch(`${COURSE_HOST}/api/course/getCourseCatalogByCourseId`, {
    courseId: courseid
}, 'POST')
/**
 * 课程评论列表
 */
export const getCourseComment = (courseid, currentPage, catalogid) => fetch(`${COURSE_HOST}/api/course/listComment`, {
    courseId: courseid,
    'page.currentPage': currentPage,
    catalogId: catalogid
}, 'POST')
/**
 * 推广员状态校验
 */
export const checkAgentState = (userid) => fetch(`${AGENT_HOST}/api/agent/user/checkAgentUser`, {
    userId: userid
}, 'POST')
