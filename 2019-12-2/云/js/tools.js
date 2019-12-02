let tools = (function(){

    //通过父级的id，去找子级
    function getChild(data,id=0){
        // debugger
        if(!data[id])return null; //如果传入的id，没有这个数据就返回null
        let ary = Object.keys(data); //[0,2,1,3,45]
        return ary.filter(item=>data[item].pid === id).map(item=>data[item]);
    }

    //专门用来找一个父级的
    function getParent(id){
        //data[id].pid 是个数字   data[data[id].pid]
        if(data[id].pid === '-1')return null; //到-1就说明到顶了
        return data[data[id].pid]; //父级的数据
    }

    //找一堆父级的
    function getParents(id){
        let pdata = getParent(id); //父级
        let ary = [data[id]]; //先把自己存进去
        //一直循环直到pdata为null
        // debugger
        while(pdata){
            ary.unshift(pdata);//把每次的父级都存到ary中
            pdata = getParent(pdata.id);//每次都要改变pdata
        }
        // console.log(ary);
        return ary;
    }

    return {
        getChild,
        getParents
    }
})();