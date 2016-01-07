import { Map, List } from 'immutable';
import { expect } from 'chai';

import makeStore from '../client/src/store';

describe('store', () => {

    it('has a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_STATE',
            data: require('../db/dummy.js')
        });

        expect(store.getState()).to.equal(Map({
            group: Map({
                _id: '1234',
                name: 'Test Group',
                location: List.of(40.702789, -74.006187)
            }),
            exclusions: List.of('mexican', 'burgers')
        }));

    });
})
