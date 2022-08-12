

const { readFromDir } = require('./readFromDir.js')
const { getImgPaths } = require('./getImgPaths.js');
const path = require('path');
const fs = require('fs');




/**
 * 
 * @param {String} currPath 查找的文件目录，支持jpg、png、jpeg、svg、gif
 * @returns 返回一个数组，内容为待删除图片的绝对路径
 */
function getDelImgs(currPath) {

    return new Promise(resolve => {
        let mdBox = readFromDir(currPath, /\.md/) //所有md文件的绝对路径
        let AllImg = readFromDir(currPath, /\.(jpg|png|gif|jpeg|svg)/) //所有图片的绝对路径
        let uesdImgArr = [] //所有被真实使用过的图片的绝对路径

        //依次处理md文件
        mdBox.forEach(ele => {
            let imgPathArr = getImgPaths(ele).map((relativeUrl) => {
                let currDirPath = path.dirname(ele)
                //得到的路径为相对路径，拼接成绝对路径
                return path.join(currDirPath, relativeUrl)
            })
            imgPathArr.forEach(imgPath => {
                if (!fs.existsSync(imgPath)) {
                    console.log(`\u001b[0;31m 路径格式不支持,该图片已排除!请在文档 "${path.basename(ele)}" 中检查关键字 "${path.basename(imgPath)}" 的格式! \u001b[0m （实际不影响删除）`)
                } else
                    uesdImgArr.push(imgPath)
            })
        });
        //数组去重: 同一张图片可能被多次使用
        uesdImgArr = new Set(uesdImgArr)
        let delImgArr = AllImg.filter(ele => !uesdImgArr.has(ele))
        console.log(`\n${currPath}下的图片总数:`, AllImg.length);
        console.log('在md文档中查找到的图片链接数量:', uesdImgArr.size);
        console.log('准备删除图片的数量:', delImgArr.length);
        resolve(delImgArr)
    })


}
module.exports = getDelImgs








