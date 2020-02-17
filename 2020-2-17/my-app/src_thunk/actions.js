export function add(){
    return {type:'INCREMENT'}
}

export function asyncadd(){
    return function(dispatch,getState){
        setTimeout(()=>{
            dispatch(add());
            // console.log(1)
        },1000)
    }
}
