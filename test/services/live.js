 // service名称：直播数据
  import Vue from "vue";
  import liveApi from "../api/live";
  
  // 中途退出
  export function liveBreak(params){
    return Vue.$http({
      ...liveApi.liveBreak,
      params,
    })
  }
  
  // 互动类型
  export function liveInteraction(params){
    return Vue.$http({
      ...liveApi.liveInteraction,
      params,
    })
  }
  
  // 年级-学科直播数据
  export function gradeSubject(params){
    return Vue.$http({
      ...liveApi.gradeSubject,
      params,
    })
  }
  
  // 年级直播数据
  export function liveGrade(params){
    return Vue.$http({
      ...liveApi.liveGrade,
      params,
    })
  }
  
  // 数据统计
  export function liveData(params){
    return Vue.$http({
      ...liveApi.liveData,
      params,
    })
  }
  
  // 直播内容
  export function liveSubject(params){
    return Vue.$http({
      ...liveApi.liveSubject,
      params,
    })
  }
  
  // 直播时长分析
  export function liveTime(params){
    return Vue.$http({
      ...liveApi.liveTime,
      params,
    })
  }
  
  // 课程参与人数
  export function liveJoin(params){
    return Vue.$http({
      ...liveApi.liveJoin,
      params,
    })
  }
  