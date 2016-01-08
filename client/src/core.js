import { List, Map, fromJS, toJS } from 'immutable';
import request from 'superagent';
// import Promise from 'bluebird';

export function setState(currentState = Map(), data) {
    return currentState.merge(fromJS(data));
}

export function exclude (current, category) {
    if (current.get('exclusions').has(category.id)) {
        return current;
    }

    request.put('/api/groups')
        .send({ exclusions: category })
        .end(function (err, res) {
            console.log(res);
            if (err) return console.error(err);
            return current.mergeIn(['exclusions'], fromJS(res.body));
        });
}

export function getTopOption (currentOptions) {
    return currentOptions.set(
        'top',
        currentOptions.get('all').get(currentOptions.get('remaining').first())
    );
}

export function filterOptions (allOptions = List(), exclusions = Map()) {

    const remaining = allOptions.filterNot(option => {
        return option.get('categories').some(cat => {
            return exclusions.has(cat.get('id'));
        })
    });

    return remaining;
}

export const INITIAL_STATE = Map();
