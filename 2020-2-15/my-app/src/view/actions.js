export function addnum(){
    // console.log(1)
    return function(dispatch){
        setTimeout(() => {
            dispatch({type:'INCREMENT'});
        }, 2000);
    }
}
