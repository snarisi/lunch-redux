import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import makeStore from './store';
import reducer from './reducer';
import {AppContainer} from './components/App';

export const store = makeStore(reducer);

store.dispatch({
    type: 'NEW_GROUP',
    group: {
        "name": "Jerks",
        "location": [40.7285206,-73.99025879999999]
    }
});

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('mount-point')
);
