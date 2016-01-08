import { setState, getTopOption, exclude, newGroup, INITIAL_STATE } from './core';
import {store} from './index.jsx';
import { Map } from 'immutable';
import request from 'superagent';

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_STATE':
            'setting state';
            return setState(state, action.data);
        case 'GET_TOP_OPTION':
            return getTopOption(state);
        case 'EXCLUDE':
            return exclude(state, action.category);
        case 'NEW_GROUP':
            request.post('/api/groups')
                .send(action.group)
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return store.dispatch({
                        type: 'SET_STATE',
                        data: res.body
                    });
                });
        default:
            return state;
    }
}
