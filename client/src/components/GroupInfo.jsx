import React from 'react';
import { Map, List, toJS, fromJS } from 'immutable';
import { dispatch, updater, getState, setState } from '../store';
import Selector from './Selector';
import Exclusions from './Exclusions';
import TopChoice from './TopChoice';

function mapStateToProps (state) {
    let map = {};
    if (state.get('group')) map.group = state.get('group');
    if (state.get('exclusions')) map.exclusions = state.get('exclusions');
    if (state.get('options')) map.allOptions = state.get('options').get('all');
    map.isAdmin = state.get('isAdmin');
    return map;
}

export default React.createClass({
    getInitialState: function () {
        return mapStateToProps(getState());
    },

    componentWillMount: function () {
        const socket = io.connect(window.location.href);

        socket.emit('room', this.props.params.id);

        socket.on('connect', function () {
            console.log('i am connected');
        });

        socket.on('update', function (data) {
            console.log('updates from socket: ', data);
            dispatch({
                type: 'SET_STATE',
                data: data
            })
        });

        updater.on('update', (updates) => {
            this.setState(mapStateToProps(updates));
        });
    },

    componentDidMount: function () {
        dispatch({
            type: 'FETCH_GROUP',
            id: this.props.params.id
        })
    },

    render: function () {
        console.log('Rendering Group Info');
        console.log('state: ', this.state)
        return (
            <div>
                <h1>{this.state.group.get('name')}</h1>
                <Selector
                    allOptions={this.state.allOptions}
                    id={this.state.group.get('_id')}
                />
                <Exclusions
                    exclusions={this.state.exclusions}
                />
                <TopChoice
                    exclusions={this.state.exclusions}
                    allOptions={this.state.allOptions}
                />
            </div>
        )
    }
})


// export default React.createClass({
//     render: function () {
//         let exclusions = this.props.exclusions || Map();
//         exclusions = exclusions.toJS();
//         let currentExclusions = Object.keys(exclusions).map(key => {
//             return <li key={key}>{exclusions[key]}</li>
//         });
//
//         console.log('rendering GroupInfo');
//         return (
//             <div>
//                 <h1>{this.props.group.get('name')}</h1>
//                 <ul>Current Exclusions:
//                     {currentExclusions}
//                 </ul>
//                 <Selector allOptions={this.props.allOptions}/>
//             </div>
//         );
//     }
// })
