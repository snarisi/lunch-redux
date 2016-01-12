import reducer from './reducer';
import { Map, fromJS } from 'immutable';
import { EventEmitter } from 'events';
// import { socket } from './index.jsx';
// console.log(socket);

let state = Map();

export const updater = new EventEmitter();

export const setState = function (current = state, data) {
    state = current.merge(fromJS(data));
    console.log(state);
    updater.emit('update', fromJS(data));
    return state;
};

export const getState = function () {
    return state;
};

export const dispatch = function (action) {
    return reducer(state, action);
};
