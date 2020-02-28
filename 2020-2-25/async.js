    async function async1() {
        console.log("async1 start");
        await async2();
        console.log("async1 end");
    }
    async function async2() {
        console.log( 'async2');
    }
    console.log("script start");
    setTimeout(function () {
        console. log("settimeout");
    },0);

    async1();
    new Promise(function (resolve) {
        console. log("promise1");
        resolve();
    }).then(function () {
        console. log("promise2");
    });

    setImmediate(()=>{
        console. log("setImmediate")
    },0)
    process.nextTick(()=>{
        console.log("process")
    });
    console.log('script end');


    /*
        script start
        async1 start
        async2
        promise1
        script end

        process  比promise要快
        async1 end
        promise2
        

        settimeout
        setImmediate

    */