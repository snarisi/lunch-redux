import React from 'react';
import { getState, updater } from '../store';

import NewGroup from './NewGroup';
import Selector from './Selector';
import GroupInfo from './GroupInfo';

function mapStateToProps (state) {
    let map = {};
    if (state.get('group')) map.group = state.get('group');
    if (state.get('exclusions')) map.exclusions = state.get('exclusions');
    if (state.get('options')) map.allOptions = state.get('options').get('all')
    return map;
}

export const App = React.createClass({
    getState: function () {
        console.log('currentState', store.getState());
    },

    getInitialState: function () {
        return mapStateToProps(getState());
    },

    componentWillMount: function () {
        updater.on('update', (updates) => {
            this.setState(mapStateToProps(updates));
            console.log('updates', updates);
            console.log('top state', getState());
            console.log('app State', this.state);
        });
    },

    render: function () {
        console.log('Rendering App');
        return (
            <div>
                <h1>Lunch Common Denominator</h1>
                <NewGroup
                    newGroup={this.props.newGroup}
                />
                <Selector
                    allOptions={this.state.allOptions}
                />
                <GroupInfo
                    group={this.state.group}
                    exclusions={this.props.exclusions}
                />
            </div>
        )
    }
})
