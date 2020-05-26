const apiJson = require("./api.json");
const config = require("./yapiHelper.config");
const fs = require("fs");
const path = require("path");

// 当前执行目录 可自定义
const pathIndex = path.resolve(__dirname + config.dirPath);

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

// TODO: 支持自定义导入http请求方法 比如axios或者request
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

const generateApiFn = (data) => {
  const { url, method, desc } = data;
  const apiName = getApiName(url);
  return `
    // ${desc}
    ${apiName} : {
        url: "${url}",
        method: "${method}"
    },`;
};

const getMethodType = (method) => {
  if (method.toLowerCase().includes("get")) {
    return "data";
  }
  return "params";
};

const generateServiceFn = (data, dirName) => {
  const { url, method, desc } = data;
  const methodType = getMethodType(method);
  const apiName = getApiName(url);

  return `
  // ${desc}
  export function ${apiName}(${methodType}){
    return ${config.http}({
      ...${dirName}Api.${apiName},
      ${methodType},
    })
  }
  `;
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

const writeFileRecursive = (path, buffer, callback) => {
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err);
    if (config.cover && fs.existsSync(path)) {
      console.log(`[ERROR]文件夹 ${path} 已存在`);
    } else {
      fs.writeFile(path, buffer, function (err) {
        if (err) return callback(err);
        return callback(null);
      });
    }
  });
};

const mkApiFile = async (data) => {
  const dirName = getFileName(data[0].url);
  // 文件注释 + export default
  let fileBuffer = generateFileDec(data) + filePreFix();
  data.map((apiItem) => {
    fileBuffer += generateApiFn(apiItem);
  });
  fileBuffer += fileLastFix();
  await writeFileRecursive(
    `${pathIndex}/api/${dirName}.js`,
    fileBuffer,
    (err) => {
      if (err) {
        console.log("[ERROR]", err);
      } else {
        console.log(`[SUCCESS]创建api文件 ${dirName} 成功`);
      }
    }
  );
};

const mkServiceFile = async (data) => {
  const dirName = getFileName(data[0].url);
  let fileBuffer = generateServiceImport(data);
  data.map((apiItem) => {
    fileBuffer += generateServiceFn(apiItem, dirName);
  });
  await writeFileRecursive(
    `${pathIndex}/services/${dirName}.js`,
    fileBuffer,
    (err) => {
      if (err) {
        console.log("[ERROR]", err);
      } else {
        console.log(`[SUCCESS]创建services文件 ${dirName} 成功`);
      }
    }
  );
};

// 生成文件
const generateFile = async (apiList) => {
  await apiList.map((v) => {
    mkApiFile(v);
    mkServiceFile(v);
  });
};

// 从json里取出需要的信息
const apiList = apiJson.map((apiType) => {
  const { list } = apiType;
  let apiArray = [];
  if (list.length > 0) {
    list.map((listItem) => {
      apiArray.push({
        url: listItem.query_path.path,
        method: listItem.method,
        desc: listItem.title,
        name: apiType.name,
      });
    });
  }
  return apiArray;
});

generateFile(apiList);
