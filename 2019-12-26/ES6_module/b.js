//一个js文件里面只能有一个default
// export default function(){
//     return 666;
// }


export default {
    aa:5,
    bb:1
}

const str = '123234';
const ary = [1,2,3];
export {str,ary};


//下面这2种方式效果是一样的，一个是导出变量，要加花括号，一个是导出函数不用加花括号了
export function fff(){

}

function ff(){}
export {ff}