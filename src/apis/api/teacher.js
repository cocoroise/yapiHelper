  // 接口分类名称：辅导老师数据
  export default {
    // 中途退出
    teacherBreak : {
        url: "/lol/dashboard/teacher/break",
        method: "POST"
    },
    // 参与人数
    teacherJoin : {
        url: "/lol/dashboard/teacher/join",
        method: "POST"
    },
    // 学员出勤率
    teacherAttendance : {
        url: "/lol/dashboard/teacher/attendance",
        method: "POST"
    },
    // 学员完课率
    teacherFinish : {
        url: "/lol/dashboard/teacher/finish",
        method: "POST"
    },
    // 学员统计
    courseStudent : {
        url: "/lol/dashboard/teacher/course/student",
        method: "POST"
    },
    // 数据统计
    teacherData : {
        url: "/lol/dashboard/teacher/data",
        method: "POST"
    },
    // 活跃学员
    teacherActive : {
        url: "/lol/dashboard/teacher/active",
        method: "POST"
    },}