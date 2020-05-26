// 文件名 --> 默认取倒数第二个分组,全小写
// aaa/bbb/Cd/ddd ---> cd
const getFileName = (url) => {
  return url.split("/").slice(-2, -1)[0].toLowerCase();
};

// 接口名 --> 取倒数两个分组，驼峰命名
// aaa/bbb/Cd/DDD --->cdDdd
const getApiName = (url) => {
  const urlArr = url.split("/");
  const last = urlArr.slice(-2);
  return toCamel(last);
};

const generateFileDec = (data) => {
  const { name } = data[0];
  return `  // 接口分类名称：${name}`;
};

const generateServiceImport = (data) => {
  const { name } = data[0];
  const dirName = getFileName(data[0].url);
  return ` // service名称：${name}
  import Vue from "vue";
  import ${dirName}Api from "../api/${dirName}";
  `;
};

const filePreFix = () => {
  return `
  export default {`;
};

const fileLastFix = () => {
  return "}";
};

// 生成驼峰写法
const toCamel = (letterArr) => {
  const one = letterArr[0].toLowerCase();
  const reg = (re = /^(\w)/g);
  const twoLower = letterArr[1]
    .split("")
    .map((v) => v.toLowerCase())
    .join("");
  let two = twoLower.replace(reg, ($0, $1) => {
    return $1.toUpperCase();
  });
  return one + two;
};

const getMethodType = (method) => {
  if (method.toLowerCase().includes("get")) {
    return "data";
  }
  return "params";
};

module.exports = {
  toCamel,
  fileLastFix,
  filePreFix,
  generateServiceImport,
  generateFileDec,
  getApiName,
  getFileName,
  getMethodType,
};
