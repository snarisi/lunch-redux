import React from 'react';
import { render } from 'react-dom';
import { toJS } from 'immutable';

import {App} from './components/App';
import { setState, getState, dispatch, updater } from './store';

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

render(
    <App things={appState}/>,
    document.getElementById('mount-point')
);
