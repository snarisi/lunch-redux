import { setState, getTopOption, exclude, INITIAL_STATE } from './core';

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.data);
        case 'GET_TOP_OPTION':
            return getTopOption(state);
        case 'EXCLUDE':
            return exclude(state, action.category);
        default:
            return state;
    }
}
