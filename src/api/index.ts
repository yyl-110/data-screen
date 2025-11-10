import request from "./request";

/**
 * 报表--基础资源看板
 * @return {*}
 */
export function getReportKnowledgeList() {
  return request({
    url: "/base-server/reportinfo/getReportKnowledgeList",
    method: "post",
  });
}
/**
 * 模块化看板
 * @return {*}
 */
export function getReportModuleList() {
  return request({
    url: "/base-server/reportinfo/getReportModuleList",
    method: "post",
  });
}
/**
 * 报表--产品设计看板
 * @return {*}
 */
export function getReportProjectList(data: {
  projectId: string | number;
  phaseId: string | number;
}) {
  return request({
    url: "/base-server/reportinfo/getReportProjectList",
    method: "post",
    data,
  });
}
/**
 * 报表--项目列表和阶段信息
 * @return {*}
 */
export function getReportProjectPhaseList() {
  return request({
    url: "/base-server/reportinfo/getReportProjectPhaseList",
    method: "post",
  });
}
/**
 * 报表--系统运行看板
 * @return {*}
 */
export function getReportSystemList() {
  return request({
    url: "/base-server/reportinfo/getReportSystemList",
    method: "post",
  });
}
/**
 * 报表--产品设计看板(new)-二维图纸进展
 * @return {*}
 */
export function pdmPicReport(data: any) {
  return request({
    url: "/base-server/reportinfo/pdmPicReport",
    method: "post",
    data,
  });
}
/**
 * 系统用户统计
 * @return {*}
 */
export function getReportSystemLoginUser(data: any) {
  return request({
    url: "/base-server/reportinfo/getReportSystemLoginUser",
    method: "post",
    data,
  });
}
/**
 * 产品设计看板(new)-交付物统计
 * @return {*}
 */
export function deliveryReport(data: any) {
  return request({
    url: "/base-server/reportinfo/deliveryReport",
    method: "post",
    data,
  });
}
/**
 * 知识看板
 * @return {*}
 */
export function getModelVisitReport(data: any) {
  return request({
    url: "/base-server/reportinfo/getModelVisitReport",
    method: "post",
    data,
  });
}
