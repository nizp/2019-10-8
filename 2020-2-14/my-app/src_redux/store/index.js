/*
    actions:
        派发action的小函数
    actionType:
        action的名字
    reducers:
        reducer
    index:
        总入口
*/
import {createStore,bindActionCreators} from 'redux';
// import {reducer} from './reducers';

import {rootReducer} from './reducers';
import * as actions from './actions';
// const store = createStore(reducer);
const store = createStore(rootReducer);
const actionCreators = bindActionCreators(actions,store.dispatch);

export {actionCreators}
export default store;


