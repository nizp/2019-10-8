/*
    通过全局对象下的__filename能够获取当前文件的绝对路径（包含文件本身）
*/
// console.log(__filename);

/*
    表示当前执行脚本所在的目录（运行文件的根目录）,不包含文件本身
*/

// console.log(__dirname); 
//D:\class\2019-9-16\officialclass\2019-12-23

let path = require('path');//找路径

// console.log(path); //拼路径的，写啥拼啥
console.log(path.join('wwwroot','./api.js'));
// console.log(path.resolve('/','./2_server.js'))

// console.log(path.resolve('wwwroot','./tmp/file/')); //最后一个参数要加./,不然出不来

//自动帮我们找当前文件的路径和配置路径进行链接
// console.log(path.resolve(__dirname,'./1.js'));
//D:\class\2019-9-16\officialclass\2019-12-23\1.js