import Vue from 'vue';

// export const bus = new Vue();

/*
    带{}
        export const xx = 10

        const a = 10;
        export {a}
    不带{}
        export default xx
*/
const bus = new Vue();
export {bus};



