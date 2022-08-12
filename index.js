
const fs = require('fs')
const readline = require('readline')
const { exec } = require('child_process');
const { stdout } = require('process');
const getDelImgs = require('./getDelImgs');
const path = require('path');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.on('close', () => {
    process.exit()
})

const question1 = () => {
    return new Promise((resolve) => {
        rl.question('\n是否要在当前文件夹下搜索md文件,否则指定文件夹路径(y/n)>: ', (res) => {
            resolve(res)
        });
    })
}
const question2 = () => {
    return new Promise((resolve) => {
        rl.question("\n请输入目标路径>: ", function (res) {
            resolve(res)
        })
    })
}

const main = async () => {

    let currPath = __dirname
    console.log("\u001b[42;31;6m 当前所在文件夹:\u001b[0m", currPath)

    let res = await question1()
    if (res == 'n' || res == 'no' || res == 'No' || res == 'NO')
        currPath = await question2()
    else if (res != 'y' || res != 'yes' || res != 'Yes') {
        console.log('\n\u001b[31m输入错误,终止程序\u001b[0m');
        rl.close()
    }

    //同步的形式检查路径是否存在，不存在则返回false
    if (!fs.existsSync(currPath)) {
        console.log(`\n\u001b[0;31m 抱歉!该路径不存在!退出程序 \u001b[0m`)
        rl.close()
    }

    let delImgArr = await getDelImgs(currPath)
    exec('mkdir deleted', { cwd: currPath }, (err, stdout) => {
        console.log('\n创建deleted文件夹')
    })
    
    let num = 0;
    delImgArr.forEach(ele => {
        if (fs.existsSync(ele)) {
            exec(`mv ${ele} ${path.join(currPath, 'deleted')}`, (err, stdout) => {
                // console.log(`${ele} 下的文件成功移动到deleted目录下`);
                num++
            })
        }
    })
    console.log(`\n\u001b[32;6m 成功删除${num}张图片\u001b[0m`);
    console.log('\n\u001b[32;6m 删除成功,退出程序 \u001b[0m');
    rl.close()

}
main()



