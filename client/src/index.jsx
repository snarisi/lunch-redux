import React from 'react';
import { render } from 'react-dom';
import { toJS } from 'immutable';

import {App} from './components/App';
import { setState, getState, dispatch, updater } from './store';

dispatch({
    type: 'SET_STATE',
    data: {
        group: {},
        exclusions: {},
        options: {}
    }
});

let appState = getState();

render(
    <App things={appState}/>,
    document.getElementById('mount-point')
);
