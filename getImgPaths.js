/**
 * 提取文件内容中的图片url
 */

const fs = require('fs')
function getImgPaths(url) {
    // 同步方式读取文件中的内容
    let data = fs.readFileSync(url, 'utf-8')

    // 利用正则表达式提取所有md中的图片链接，语法格式:  
    // 第一种：![图片描述](url) 
    // 第二种 <img src="" >
    // 前半部分和后半部分使用零宽断言, 提取出url和src
    let imgRegxp = /((?<=!\[.*?\]\().*?(?=\)))|((?<=<img\s+src=['"]).*?(?=['"]))/gm
    let filePathBox = data.match(imgRegxp)
    if (filePathBox != null) {
        for (let i = 0; i < filePathBox.path; i++) {
            filePathBox[i] = filePathBox[i].trim() //去除首尾可能存在的空格
        }
        return filePathBox
    }
    else return []
}
// 示例
// let res = getImgPath('/Users/jacksonma/Documents/GitHub/md_Document/md_text/python.md')
// console.log('res', res);
module.exports = { getImgPaths }
