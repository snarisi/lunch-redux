import reducer from './reducer';
import { Map, fromJS } from 'immutable';
import { EventEmitter } from 'events';

let state = Map();

export const updater = new EventEmitter();

export const setState = function (current = state, data) {
    console.log(data);
    state = current.merge(fromJS(data));
    updater.emit('update', fromJS(data));
    return state;
}

export const getState = function () {
    return state;
}

export const dispatch = function (action) {
    return reducer(state, action);
}
