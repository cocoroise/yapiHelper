 // service名称：活动数据
  import Vue from "vue";
  import activityApi from "../api/activity";
  
  // PV
  export function activityPv(params){
    return Vue.$http({
      ...activityApi.activityPv,
      params,
    })
  }
  
  // TOP-N机构
  export function activityInstitution(params){
    return Vue.$http({
      ...activityApi.activityInstitution,
      params,
    })
  }
  
  // UV
  export function activityUv(params){
    return Vue.$http({
      ...activityApi.activityUv,
      params,
    })
  }
  
  // 学员地图
  export function studentMap(params){
    return Vue.$http({
      ...activityApi.studentMap,
      params,
    })
  }
  
  // 学科占比
  export function subjectPercent(params){
    return Vue.$http({
      ...activityApi.subjectPercent,
      params,
    })
  }
  
  // 年级占比
  export function gradePercent(params){
    return Vue.$http({
      ...activityApi.gradePercent,
      params,
    })
  }
  
  // 新增用户
  export function userNew(params){
    return Vue.$http({
      ...activityApi.userNew,
      params,
    })
  }
  
  // 机构销售
  export function institutionSales(params){
    return Vue.$http({
      ...activityApi.institutionSales,
      params,
    })
  }
  
  // 销售额
  export function activitySales(params){
    return Vue.$http({
      ...activityApi.activitySales,
      params,
    })
  }
  