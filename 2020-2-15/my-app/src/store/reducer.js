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
    collect:[]
},action){
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "CHANG_CHECKED":
            for(let i=0;i<state.ary.length;i++){
                if(action.id === state.ary[i].id){
                    state.ary[i].checked = !state.ary[i].checked;
                    break;
                }
            }
        break;
        case "CHANGE_ALL": //action.payload
            state.ary.forEach((item)=>{
                item.checked = action.payload;
            });
        break;
        case "COLLECT_ARY":
            // state.collect
            /*
                [2,3,4]
                [2,3]
            */
           let filter = state.ary.filter(item=>item.checked);
           if(state.collect.length){
                state.collect = filter.filter(e=>{
                    for(let i=0;i<state.collect.length;i++){
                        if(e.id !== state.collect[i]){
                            return e;
                        }
                    }
                });
            }else{
                state.collect.push(...filter);
            }
            state.collect = JSON.parse(JSON.stringify(state.collect));
            state.collect.forEach(e=>e.checked=false);
           

            console.log(state.collect,state.ary);

        break;
        default:
            return state;

    }

    return state;
}


export default reducer;