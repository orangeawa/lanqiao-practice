const buildFn = () => {
  const path = require('path');
  const fs = require('fs');
  const webpack = require('./webpack.config'); // webpack 配置对象
  // 以上代码请勿修改
  // TODO：待补充代码，所有代码请写在 `buildFn` 函数内
  
  let fileContent = fs.readFileSync(path.join(__dirname, webpack.entry), 'utf-8')
  Object.keys(webpack.output.resolve.alias).forEach((alias) => {
    const aliasPath = webpack.output.resolve.alias[alias]
    const aliasReg = new RegExp(alias, 'g')
    fileContent = fileContent.replace(aliasReg, aliasPath)
    console.log(fileContent);
  })

  console.log("写入文件");
  
  fs.writeFileSync(path.join(__dirname, webpack.entry), fileContent, 'utf-8');
}

module.exports = buildFn;
