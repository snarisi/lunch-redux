import React from 'react';
import NewGroup from './NewGroup';
import { connect } from 'react-redux';
import {store} from '../index.jsx';

export const App = React.createClass({
    getState: function () {
        console.log('currentState', store.getState());
    },
    render: function () {
        return (
            <div onClick={this.getState}>
                <h1>Lunch Common Denominator</h1>
                <h1>{this.props.name}</h1>
                <NewGroup />
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

export const AppContainer = connect(mapStateToProps)(App);
