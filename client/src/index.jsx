import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { toJS } from 'immutable';

import reducer from './reducer';
import {App} from './components/App';
import { setState, getState, dispatch, updater } from './store';

//
// setState(getState(), {
//     group: {
//         name: 'Sam is the best',
//         id: 69,
//         location: [69, -69]
//     },
//     exclusions: {}
// });

dispatch({
    type: 'SET_STATE',
    data: {
        group: {
            name: 'Sam is the best',
            id: 69,
            location: [69, -69]
        },
        exclusions: {}
    }
});

let appState = getState();
updater.on('update', () => appState = getState());

render(
    <App things={appState}/>,
    document.getElementById('mount-point')
);
