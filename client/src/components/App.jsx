import React from 'react';
import { connect } from 'react-redux';
import {store} from '../index.jsx';
import * as actions from '../actions';

import NewGroup from './NewGroup';
import Selector from './Selector';
import GroupInfo from './GroupInfo';

export const App = React.createClass({
    getState: function () {
        console.log('currentState', store.getState());
    },
    render: function () {
        return (
            <div>
                <h1>Lunch Common Denominator</h1>
                <NewGroup
                    newGroup={this.props.newGroup}
                />
                <Selector
                    allOptions={this.props.allOptions}
                    exclude={this.props.exclude}
                />
                <GroupInfo
                    name={this.props.name}
                    exclusions={this.props.exclusions}
                />
            </div>
        )
    }
})

function mapStateToProps (state) {
    return {
        name: state.getIn(['group', 'name']),
        allOptions: state.getIn(['options', 'all']),
        exclusions: state.get('exclusions')
    };
}

export const AppContainer = connect(mapStateToProps, actions)(App);
