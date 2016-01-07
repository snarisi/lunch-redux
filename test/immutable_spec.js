// import { expect } from 'chai';
// import { List, Map } from 'immutable';
//
// xdescribe('immutatability', () => {
//     describe('a List', () => {
//         function exclude(currentState, category) {
//             return currentState.push(category);
//         }
//
//         it('is immutable', () => {
//             let state = List.of('mexican', 'burgers');
//             let nextState = exclude(state, 'chinese');
//
//             expect(nextState).to.equal(List.of('mexican', 'burgers', 'chinese'));
//             expect(state).to.equal(List.of('mexican', 'burgers'));
//         });
//     });
//
//     describe('a tree', () => {
//         it('is immutable', () => {
//             function exclude(currentState, category) {
//                 return currentState.set(
//                     'exclusions',
//                     currentState.get('exclusions').push(category)
//                 );
//             }
//
//             let state = Map({
//                 exclusions: List.of('mexican', 'burgers'),
//                 options: Map({
//                     all: List.of('Place1', 'Place2', 'Place3')
//                 })
//             });
//             let nextState = exclude(state, 'chinese');
//             expect(state).to.equal(Map({
//                 exclusions: List.of('mexican', 'burgers'),
//                 options: Map({
//                     all: List.of('Place1', 'Place2', 'Place3')
//                 })
//             }));
//             expect(nextState).to.equal(Map({
//                 exclusions: List.of('mexican', 'burgers', 'chinese'),
//                 options: Map({
//                     all: List.of('Place1', 'Place2', 'Place3')
//                 })
//             }));
//         });
//     });
// })
