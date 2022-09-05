const fs = require('fs')
const path = require('path');
const { exec } = require('child_process');

/**
 * 
 * @param {Array} delImgArr 待删除图片的绝对路径
 * @param {String} currPath 执行操作的目录
 * @returns Promise
 */
function moveImgs(delImgArr, currPath) {

    let num = 0
    delImgArr.forEach(ele => {
        if (fs.existsSync(ele)) {
            exec(`mv ${ele} ${path.join(currPath, 'deleted')}`)
            // console.log(`${ele} 下的文件成功移动到deleted目录下`);
            num++
        }
    })
    return num

}

module.exports = moveImgs