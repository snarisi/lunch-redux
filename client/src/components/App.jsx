import React from 'react';
import Router, { Route } from 'react-router';
import { getState, updater } from '../store';
import NewGroup from './NewGroup';
import GroupInfo from './GroupInfo';

export const App = React.createClass({
    render: function () {
        console.log('Rendering App');
        return (
            <Router>
                <Route path="/" component={NewGroup} />
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
