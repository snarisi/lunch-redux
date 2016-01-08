import { List, Map, fromJS, toJS } from 'immutable';
import request from 'superagent';
// import Promise from 'bluebird';

export function setState(currentState = Map(), data) {
    return currentState.merge(fromJS(data));
}

export function exclude (current, category) {
    console.log('current', current);

    if (current.get('exclusions').has(category.id)) {
        return current;
    }

    return current.mergeIn(['exclusions'], fromJS(category));
}

export function getTopOption (currentOptions) {
    return currentOptions.set(
        'top',
        currentOptions.get('all').get(currentOptions.get('remaining').first())
    );
}

export function filterOptions (currentState) {
    const exclusions = List.of('mexican');
    const allOptions = currentState.getIn(['options', 'all'])

    const remaining = currentState.getIn(['options', 'remaining']).filterNot(i => {
        return allOptions.get(i).get('categories').some(cat => {
            return exclusions.includes(cat.get('id'));
        })
    });

    return currentState.setIn(
        ['options', 'remaining'],
        remaining
    );
}

export const INITIAL_STATE = Map();
