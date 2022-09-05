/**
 * 获取文件夹中指定后缀文件的路径
 */

const fs = require('fs')
const path = require('path');

/**
 * 
 * @param {String} startPath 要进行查找的目录路径
 * @param {RegExp} fileType 后缀名的正则表达式
 * @returns Promise,resolve结果存放符合后缀名的文件的绝对路径
 */
function readFromDir(startPath, fileType) {

    let fileBox = []
    function dfs(startPath) {
        //readdir:获取指定路径下所有的文件和目录，readdir只读取一层。结果以数组返回
        //readdirSyce为同步方法，否则后续异步执行会报错
        let files = fs.readdirSync(startPath)

        files.forEach((ele) => {
            //item : the path of a file or a folder
            let itemPath = path.join(startPath, ele)
            let stat = fs.lstatSync(itemPath) //返回一个 fs.Stats 类
            if (stat.isDirectory())
                dfs(itemPath, fileType) //如果是目录则递归调用此函数
            else if (fileType.test(path.extname(ele)))
                fileBox.push(itemPath)
        })
    }
    dfs(startPath) //存放指定后缀名文件的路径
    return fileBox

}
//示例:
// log :readFromDir('/Users/jacksonma/Documents/GitHub/md_Document', /\.((md)|(txt))/)
module.exports = { readFromDir }
