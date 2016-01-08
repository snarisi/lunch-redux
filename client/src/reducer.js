import { setState } from './store';
import { Map, fromJS } from 'immutable';
import request from 'superagent';

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.data);
        case 'GET_TOP_OPTION':
            return getTopOption(state);
        case 'EXCLUDE':
            if (state.get('exclusions').has(action.category.id)) {
                return state;
            }

            request.put('/api/groups')
                .send({ exclusions: action.category })
                .end(function (err, res) {
                    if (err) return console.error(err);
                    console.log('SERVER RESPONSE: ', res)
                    return setState(state, res.body);
                });
        case 'NEW_GROUP':
            request.post('/api/groups')
                .send(action.group)
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return setState(state, res.body);
                });
        default:
            return state;
    }
}
