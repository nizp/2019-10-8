function createStore(reducer,initState){
    if(typeof reducer !== 'function'){
        throw new Error('reducer必须为一个函数')
    }

    let currentState = initState; //currentState就是数据
    let currentReducer = reducer; //currentReducer默认的reducer

    let currentList = []; //订阅池

    function getState(){
        return currentState;
    }

    /*
        Object.getPrototypeOf
            获取到当前对象的__proto__

        function getPrototypeOf(obj){
            return obj.__proto__
        }

        纯对象，就是实例的原型链 === Object.prototype
        {}.__proto__ === Object.prototype

    */

    function isObject(obj){
        if(typeof obj !== 'object' || obj === null){
           return false;
        }
        return Object.getPrototypeOf(obj) === Object.prototype;

        /*
            function Fn(){}
            Fn.prototype.xx
            let f = new Fn;

            isObject(f);

            f.__proto__ -> f.__proto__.__proto__

            Object.prototype
        */

        // let proto = obj;
        // //找到obj最最原始的prototype
        // while(Object.getPrototypeOf(proto)){
        //     proto = Object.getPrototypeOf(proto)
        // }

        // console.log(proto === Object.prototype)
        
    }

    function dispatch(action){
        if(!isObject(action)){
            throw new Error('action必须为对象')
        }
        currentState = JSON.parse(JSON.stringify(currentState));
        
        currentState = currentReducer(currentState,action);

        // currentState = JSON.parse(JSON.stringify(currentState));

        //只要发起action就到订阅池中去把池子中的函数依次调用
        currentList.forEach(listener=>listener());
    }   

    function subscribe(listener){
        currentList.push(listener); //订阅监听的回调函数
        //就解绑了监听状态        
        return function(){
            let index = currentList.indexOf(listener)
            currentList.splice(index,1);
        }
    }

    dispatch({type:'@_@'})

    return {
        getState,
        dispatch,
        subscribe
    }
}


export {createStore}