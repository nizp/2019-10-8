import {INCREMENT,DECREMENT,INCREMENT2,DECREMENT2} from './actionType';
import {combineReducers} from 'redux';
const reducer = (state = {num:0}, action) => {
    state = JSON.parse(JSON.stringify(state)); //深度拷贝
    switch (action.type) {
        case INCREMENT:
            state.num ++;
            console.log(state.num);
            break;
        case DECREMENT:
            state.num --;
            break;
        default:
            return state
    }
    return state
}

const reducer2 = (state = {num:10}, action) => {
    console.log('2次');
    state = JSON.parse(JSON.stringify(state)); //深度拷贝
    switch (action.type) {
        case INCREMENT2:
            state.num += 2;
            break;
        case DECREMENT2:
            state.num -= 2;
            break;
        default:
            return state
    }
    return state
}

const rootReducer = combineReducers({
    r1:reducer,
    r2:reducer2
});

export {rootReducer}
// export {reducer2}