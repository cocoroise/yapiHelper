  // 接口分类名称：活动数据
  export default {
    // PV
    activityPv : {
        url: "/lol/dashboard/activity/PV",
        method: "POST"
    },
    // TOP-N机构
    activityInstitution : {
        url: "/lol/dashboard/activity/institution",
        method: "POST"
    },
    // UV
    activityUv : {
        url: "/lol/dashboard/activity/UV",
        method: "POST"
    },
    // 学员地图
    studentMap : {
        url: "/lol/dashboard/activity/student/map",
        method: "POST"
    },
    // 学科占比
    subjectPercent : {
        url: "/lol/dashboard/activity/subject/percent",
        method: "POST"
    },
    // 年级占比
    gradePercent : {
        url: "/lol/dashboard/activity/grade/percent",
        method: "POST"
    },
    // 新增用户
    userNew : {
        url: "/lol/dashboard/activity/user/new",
        method: "POST"
    },
    // 机构销售
    institutionSales : {
        url: "/lol/dashboard/activity/institution/sales",
        method: "POST"
    },
    // 销售额
    activitySales : {
        url: "/lol/dashboard/activity/sales",
        method: "POST"

    },}