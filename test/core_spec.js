import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setState, exclude, getTopOption, filterOptions } from '../client/src/core';

describe('application logic', () => {

    describe('setState', () => {
        it('sets the state based on data recieved', () => {
            const data = require('../db/dummy.js');
            const yelpResults = ['Place1', 'Place2', 'Place3'];
            let currentState;
            const state = setState(currentState, data);

            //TODO figure out how to fake the yelp api call
            expect(state).to.equal(Map({
                group: Map({
                    _id: '1234',
                    name: 'Test Group',
                    location: List.of(40.702789, -74.006187)
                }),
                exclusions: List.of('mexican', 'burgers')
            }));
        });

        it('only updates the relevant properties', () => {
            const state = Map({
                group: Map({
                    _id: '1234',
                    name: 'Test Group',
                    location: List.of(40.702789, -74.006187)
                }),
                exclusions: List.of('mexican', 'burgers')
            });
            const data = {
                "exclusions": ['mexican', 'burgers', 'chinese']
            };
            const newState = setState(state, data);
            expect(newState).to.equal(Map({
                group: Map({
                    _id: '1234',
                    name: 'Test Group',
                    location: List.of(40.702789, -74.006187)
                }),
                exclusions: List.of('mexican', 'burgers', 'chinese')
            }));
        });
    });

    describe('exclude', () => {

        it('adds an excluded category to the state', () => {
            const state = Map({
                exclusions: List.of('mexican', 'burgers'),
                options: Map({
                    all: List.of('Place1', 'Place2', 'Place3')
                })
            });
            const nextState = exclude(state, 'chinese');

            expect(nextState).to.equal(Map({
                exclusions: List.of('mexican', 'burgers', 'chinese'),
                options: Map({
                    all: List.of('Place1', 'Place2', 'Place3')
                })
            }));
        });

    });

    describe('getTopOption', () => {

        it('pulls the top pick from the remaining options', () => {
            const options = Map({
                all: List.of('Place1', 'Place2', 'Place3'),
                remaining: List.of(1, 2)
            });
            const nextStateOptions = getTopOption(options);
            expect(nextStateOptions).to.equal(Map({
                all: List.of('Place1', 'Place2', 'Place3'),
                remaining: List.of(1, 2),
                top: 'Place2'
            }));
        });
    });

    describe('filterOptions', () => {

        it('it filters the remaining options based on excluded categories', () => {
            let place1 = Map({
                name: 'Mexican Place',
                categories: List.of(
                    Map({
                        id: 'mexican',
                        display: 'Mexican'
                    }),
                    Map({
                        id: 'sandwiches',
                        display: 'Sandwiches'
                    })
                ),
                location: Map({
                    address: '111 One Street',
                    coordinates: List.of(20, 40)
                }),
                rating: 5
            });
            let place2 = Map({
                name: 'Pizza Place',
                categories: List.of(
                    Map({
                        id: 'pizza',
                        display: 'Pizza'
                    }),
                    Map({
                        id: 'sandwiches',
                        display: 'Sandwiches'
                    })
                ),
                location: Map({
                    address: '111 One Street',
                    coordinates: List.of(20, 40)
                }),
                rating: 5
            });
            let place3 = Map({
                name: 'Chinese Place',
                categories: List.of(
                    Map({
                        id: 'chinese',
                        display: 'Chinese'
                    }),
                    Map({
                        id: 'sandwiches',
                        display: 'Sandwiches'
                    })
                ),
                location: Map({
                    address: '111 One Street',
                    coordinates: List.of(20, 40)
                }),
                rating: 5
            });
            const state = Map({
                exclusions: List.of('burgers', 'mexican'),
                options: Map({
                    all: List.of(place1, place2, place3),
                    remaining: List.of(0, 1, 2)
                })
            });
            const nextStateOptions = filterOptions(state);
            expect(nextStateOptions).to.equal(Map({
                exclusions: List.of('burgers', 'mexican'),
                options: Map({
                    all: List.of(place1, place2, place3),
                    remaining: List.of(1, 2)
                })
            }));
        })
    })
});
