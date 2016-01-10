import React from 'react';
import Router, { Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { getState, updater } from '../store';
import NewGroup from './NewGroup';
import GroupInfo from './GroupInfo';

const history = createBrowserHistory();

export const App = React.createClass({
    render: function () {
        console.log('Rendering App');
        return (
            <Router>
                <Route
                    path="/"
                    component={NewGroup}
                    history={history}
                />
                <Route path="/group/:id" component={GroupInfo} />
            </Router>
        )
    }
})


// <GroupInfo
// group={this.state.group}
// exclusions={this.state.exclusions}
// allOptions={this.state.allOptions}
// />
