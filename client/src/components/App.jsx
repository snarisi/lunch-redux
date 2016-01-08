import React from 'react';
import NewGroup from './NewGroup';
import { connect } from 'react-redux';
import {store} from '../index.jsx';
import * as actions from '../actions';

export const App = React.createClass({
    getState: function () {
        console.log('currentState', store.getState());
    },
    render: function () {
        console.log(this.props.newGroup);
        return (
            <div>
                <h1>Lunch Common Denominator</h1>
                <h1>{this.props.name}</h1>
                <NewGroup newGroup={this.props.newGroup}/>
            </div>
        )
    }
})

function mapStateToProps (state) {
    console.log(state);
    return {
        name: state.getIn(['group', 'name'])
    };
}

export const AppContainer = connect(mapStateToProps, actions)(App);
