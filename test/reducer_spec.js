import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../client/src/reducer';

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            data: require('../db/dummy.js')
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            group: Map({
                _id: '1234',
                name: 'Test Group',
                location: List.of(40.702789, -74.006187)
            }),
            exclusions: List.of('mexican', 'burgers')
        }));
    });

    it('handles GET_TOP_OPTION', () => {
        const options = Map({
            all: List.of('Place1', 'Place2', 'Place3'),
            remaining: List.of(1, 2)
        });
        const action = {
            type: 'GET_TOP_OPTION'
        }
        const nextStateOptions = reducer(options, action);
        expect(nextStateOptions).to.equal(Map({
            all: List.of('Place1', 'Place2', 'Place3'),
            remaining: List.of(1, 2),
            top: 'Place2'
        }));
    });

    it('handles exclude', () => {
        const state = Map({
            exclusions: List.of('mexican', 'burgers'),
            options: Map({
                all: List.of('Place1', 'Place2', 'Place3')
            })
        });
        const action = {
            type: 'EXCLUDE',
            category: 'chinese'
        }
        const nextState = reducer(state, action);

        expect(nextState).to.equal(Map({
            exclusions: List.of('mexican', 'burgers', 'chinese'),
            options: Map({
                all: List.of('Place1', 'Place2', 'Place3')
            })
        }));
    })
});
