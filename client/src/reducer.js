import { setState, getState } from './store';
import { Map, fromJS } from 'immutable';
import request from 'superagent';

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.data);
        case 'GET_TOP_OPTION':
            return getTopOption(state);
        case 'EXCLUDE':
            let id = Object.keys(action.category)[0];
            if (state.hasIn(['exclusions', id])) {
                return state;
            }
            request.put('/api/groups/' + action.id)
                .send({ exclusions: action.category })
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return setState(state, {exclusions: res.body});
                });
            break;
        case 'NEW_GROUP':
            setState(state, {group: { name: action.group.name }});
            request.post('/api/groups')
                .send(action.group)
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return setState(state, res.body);
                });
            break;
        case 'FETCH_GROUP':
            request.get('/api/groups/' + action.id)
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return setState(state, res.body);
                })
            break;
        case 'CLOSE_VOTING':
            request.put('/api/groups')
                .send({ closed:true })
                .end(function (err, res) {
                    if (err) return console.error(err);
                    return setState(state, res.body);
                });
            break;
        default:
            return state;
    }
}
