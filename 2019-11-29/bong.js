function bong(obj,obj2){
    let {left:l,top:t,bottom:b,right:r} = obj.getBoundingClientRect();
    let {left:l2,top:t2,bottom:b2,right:r2} = obj2.getBoundingClientRect();
    if(r < l2 || b < t2 || l > r2 || t > b2){
        console.log('没碰到');
        return false;
    }else{
        console.log('碰到');
        return true;
    }
}