 // service名称：公共分类
  import Vue from "vue";
  import dashboardApi from "../api/dashboard";
  
  // 筛选条件
  export function dashboardCondition(params){
    return Vue.$http({
      ...dashboardApi.dashboardCondition,
      params,
    })
  }
  