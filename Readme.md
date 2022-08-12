

## md文件自动化删除未使用图片脚本

- 仅支持图片链接为==相对路径==格式 （绝对路径格式不影响删除）
- 支持搜索图片后缀：==jpg==、==png==、==gif==、==jpeg==、==svg==
- 支持不同操作系统的路径格式
- 支持搜索图片格式
  - `![图片描述](url)`
  - `<img src="" >`
- 支持定位特殊路径的位置
- 将待删除图片移动到指定目录的==deleted==目录





## 使用

- 将==getDelImgs.js==、==getImgPaths.js==、==index.js==、==readFromDir.js== 拷贝到指定目录下，将搜索脚本==同级目录==中的所有待删除图片 （或者输入指定目录的路径）
- `node index.js` 



## 使用技术

- Nodejs、ES6
- 正则表达式 Regular Expression
- 异步编程：Promise、Async

- 模块化
- 简单算法dfs





## 实现过程

- 搜索指定目录下的所有md后缀文件，得到==数组A==，value值含义为==md文件==的绝对路径
- 搜索指定目录下的所有图片，得到==数组B==，value值含义为==单张图片==的绝对路径
- 依次取出数组A中的md文件绝对路径，读取文件中的图片链接url和src，得到==数组C==，value值含义为==已被使用过的单张图片==的绝对路径。
- 从数组B中筛掉数组C，得到数组D，value值含义为 ==待删除的单张图片==的绝对路径
- 读取数组D，删除其中的图片



## [Github](https://github.com/Panda-Ma/Delete-Img-Script)

- Star🌟
