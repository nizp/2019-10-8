function reducer(state={
    ary:[
        {
            songer:'邓紫棋',
            txt:'泡沫',
            id:0,
            checked:true
        },
        {
            songer:'周杰伦',
            txt:'发如血',
            id:1,
            checked:false
        },
        {
            songer:'龚铭',
            txt:'虞美人',
            id:2,
            checked:false
        },
        {
            songer:'与卿海棠',
            txt:'风小筝',
            id:3,
            checked:false
        }
],
    collect:[],
    select:'all',
    add:[]
},action){
    state = JSON.parse(JSON.stringify(state));
    let aryname = state.select==='all'?'ary':state.select;


    if(aryname === 'collect'){
        state.ary.forEach(ele=>ele.checked = false);
    }

    switch(action.type){
        case "CHANG_CHECKED":
            for(let i=0;i<state[aryname].length;i++){
                if(action.id === state[aryname][i].id){
                    state[aryname][i].checked = !state[aryname][i].checked;
                    break;
                }
            }
        break;
        case "CHANGE_ALL": //action.payload
            state[aryname].forEach((item)=>{
                item.checked = action.payload;
            });
        break;
        case "COLLECT_ARY":
            // state.collect
            /*
                [2,3,4]
                [2,3]
            */
           let filter = state.ary.filter(item=>item.checked);//先把选中项过滤出来
           console.log(filter,'filter数组');
           let newAry = [];
           if(state.collect.length){
                let aryId = state.collect.map(item=>item.id);
                filter.forEach(item=>{
                    if(!aryId.includes(item.id)){
                        newAry.push(item);
                    }
                });
                state.collect.push(...newAry);
                
            }else{
                
                state.collect.push(...filter);
                console.log('第一次的数组',state.collect)
            }
            state.collect = JSON.parse(JSON.stringify(state.collect));
            state.collect.forEach(e=>e.checked=false);

            console.log(state.collect,'更新之后的数组');
        break;

        case "ADD_ARY":
           let filter2 = state.ary.filter(item=>item.checked);//先把选中项过滤出来
           let newAry2 = [];
           if(state.add.length){
                let aryId = state.add.map(item=>item.id);
                filter2.forEach(item=>{
                    if(!aryId.includes(item.id)){
                        newAry2.push(item);
                    }
                });
                state.add.push(...newAry2);
                
            }else{
                
                state.add.push(...filter2);
            }
            state.add = JSON.parse(JSON.stringify(state.add));
            state.add.forEach(e=>e.checked=false);
        break;

        case "CHANGE_SELECT": //action.select
           state.select = action.select;
        break;
        case "DELETE": //action.select
            state[aryname] = state[aryname].filter(item=>!item.checked);
        break;
        default:
            return state;

    }

    return state;
}


export default reducer;