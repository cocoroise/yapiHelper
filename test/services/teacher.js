 // service名称：辅导老师数据
  import Vue from "vue";
  import teacherApi from "../api/teacher";
  
  // 中途退出
  export function teacherBreak(params){
    return Vue.$http({
      ...teacherApi.teacherBreak,
      params,
    })
  }
  
  // 参与人数
  export function teacherJoin(params){
    return Vue.$http({
      ...teacherApi.teacherJoin,
      params,
    })
  }
  
  // 学员出勤率
  export function teacherAttendance(params){
    return Vue.$http({
      ...teacherApi.teacherAttendance,
      params,
    })
  }
  
  // 学员完课率
  export function teacherFinish(params){
    return Vue.$http({
      ...teacherApi.teacherFinish,
      params,
    })
  }
  
  // 学员统计
  export function courseStudent(params){
    return Vue.$http({
      ...teacherApi.courseStudent,
      params,
    })
  }
  
  // 数据统计
  export function teacherData(params){
    return Vue.$http({
      ...teacherApi.teacherData,
      params,
    })
  }
  
  // 活跃学员
  export function teacherActive(params){
    return Vue.$http({
      ...teacherApi.teacherActive,
      params,
    })
  }
  