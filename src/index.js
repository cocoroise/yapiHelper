const fs = require("fs");
const path = require("path");

const {
  toCamel,
  fileLastFix,
  filePreFix,
  generateServiceImport,
  generateFileDec,
  getApiName,
  getFileName,
  getMethodType,
} = require("./utils");

const apiJson = require("./api.json");
const config = require("../yapiHelper.config");

// 当前执行目录 可自定义
const pathIndex = path.resolve(process.cwd() + config.dirPath);

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

const writeFileRecursive = (path, buffer, callback) => {
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err);
    fs.writeFile(path, buffer, function (err) {
      if (err) return callback(err);
      return callback(null);
    });
  });
};
const patchApiFile = (filePath, data) => {
  const oldFileData = require(filePath).default;
  const oldPathArray = Object.keys(oldFileData).map((keys) => {
    return oldFileData[keys].url;
  });

  const patchData = data.filter((v) => {
    return oldPathArray.indexOf(v.url) === -1;
  });

  // 倒数第二行插入diff的东西
  const fileData = fs.readFileSync(filePath, "utf8").split("\n");
  fileData.splice(fileData.length - 1, 0, patchData);
  fs.writeFileSync(filePath, fileData.join("\n"), "utf8");
};

const patchServiceFile = (filePath, data) => {
  const oldFileData = require(filePath).default;
  const oldPathArray = Object.keys(oldFileData).map((keys) => {
    return oldFileData[keys].url;
  });

  return data.filter((v) => {
    return oldPathArray.indexOf(v.url) !== -1;
  });
};

const mkApiFile = async (data) => {
  const dirName = getFileName(data[0].url);
  const apiFileName = `${pathIndex}/api/${dirName}.js`;

  // 文件注释 + export default
  let fileBuffer = generateFileDec(data) + filePreFix();
  if (fs.existsSync(apiFileName)) {
    patchApiFile(apiFileName, data);
  } else {
    data.map((apiItem) => {
      fileBuffer += generateApiFn(apiItem);
    });
    fileBuffer += fileLastFix();

    await writeFileRecursive(apiFileName, fileBuffer, (err) => {
      if (err) {
        console.log("[ERROR]", err);
      } else {
        console.log(`[SUCCESS]创建api文件 ${dirName} 成功`);
      }
    });
  }
};

const mkServiceFile = async (data) => {
  const dirName = getFileName(data[0].url);
  const serviceFileName = `${pathIndex}/services/${dirName}.js`;
  let fileBuffer = generateServiceImport(data);

  // if (fs.existsSync(apiFileName)) {
  //   fileData = patchServiceFile(apiFileName, data);
  // } else {
  //   fileData = data;
  // }
  data.map((apiItem) => {
    fileBuffer += generateServiceFn(apiItem, dirName);
  });

  await writeFileRecursive(serviceFileName, fileBuffer, (err) => {
    if (err) {
      console.log("[ERROR]", err);
    } else {
      console.log(`[SUCCESS]创建services文件 ${dirName} 成功`);
    }
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

// 生成文件
const generateFile = async (apiList) => {
  await apiList.map((v) => {
    mkApiFile(v);
    mkServiceFile(v);
  });
};

module.exports = generateFile(apiList);
