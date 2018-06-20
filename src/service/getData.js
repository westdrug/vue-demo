/**
 * 数据接口
 */

import fetch from '../config/fetch'

const USER_HOST = 'userApi'         //用户

const COURSE_HOST = 'courseApi'     //课程

const ORDER_HOST = 'orderApi'       //订单

const CLASSIFY_HOST = 'sysApi'      //专业

const CLASS_HOST = 'classApi'       //班级

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
 * 班级首页
 */
export const getAllClass = (userid, classname, currentPage) => fetch(`${CLASS_HOST}/api/class/ajax/getClassesList`, {
    userId: userid,
    'class.className': classname,
    'page.currentPage': currentPage
}, 'POST')
/**
 * 班级首页 - 我的
 */
export const getMyClass = (userid, currentPage) => fetch(`${CLASS_HOST}/api/uc/class/personal/ajax/list/class`, {
    userId: userid,
    'page.currentPage': currentPage
}, 'POST')
/**
 * 班级下话题
 */
export const classAllTopic = (classid, currentPage) => fetch(`${CLASS_HOST}/api/class/topic/ajax/list/topic`, {
    classId: classid,
    'page.currentPage': currentPage
}, 'POST')
/**
 * 班级下话题的所有评论
 */
export const topicAllComment = (classid, topicid, currentPage) => fetch(`${CLASS_HOST}/api/class/topic/ajax/list/reply`, {
    classId: classid,
    topicId: topicid,
    'page.currentPage': currentPage
}, 'POST')
export const sendTopicComment = (userid, topicid, targetreplyid, context, classid) => fetch(`${CLASS_HOST}/api/class/topic/ajax/save/reply`, {
    userId: userid,
    'topicReply.topicId': topicid,
    'topicReply.targetReplyId': targetreplyid,
    'topicReply.context': context,
    'topicReply.classId': classid
}, 'POST')
/**
 * 推广员状态校验
 */
export const checkAgentState = (userid) => fetch(`${AGENT_HOST}/api/agent/user/checkAgentUser`, {
    userId: userid
}, 'POST')
/**
 * 平台总推广员数量
 */
export const checkAgentNumber = () => fetch(`${AGENT_HOST}/api/agent/center/openExtension`, {}, 'POST')
/**
 * 推广员主页数据
 */
export const getAgentIndData = (userid) => fetch(`${AGENT_HOST}/api/agent/user/index`, {
    userId: userid
}, 'POST')
/**
 * 推广中心首页课程
 */
export const getAgentIndCourse = (coursePage, userid, from) => fetch(`${AGENT_HOST}/api/agent/user/extension`, {
    'page.currentPage': coursePage,
    userId: userid,
    from: from
}, 'POST')
/**
 * 上传文件
 */
export const uploadFile = (userid, filepath) => fetch('/res/api/image/appUploadImg', {
    userId: userid,
    filePath: filepath
}, 'POST', 'isUpload')

