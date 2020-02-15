export function addnum(){
    return function(dispatch){
        console.log(2);
        setTimeout(() => {
            dispatch(()=>({type:'INCREMENT'}));
        }, 2000);
    }
}
