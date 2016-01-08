import React from 'react';
import { Map, List, toJS } from 'immutable';
import { dispatch, updater, getState } from '../store';
import Selector from './Selector';
import Exclusions from './Exclusions';
import TopChoice from './TopChoice';

function mapStateToProps (state) {
    let map = {};
    if (state.get('group')) map.group = state.get('group');
    if (state.get('exclusions')) map.exclusions = state.get('exclusions');
    if (state.get('options')) map.allOptions = state.get('options').get('all')
    return map;
}

export default React.createClass({
    getInitialState: function () {
        return mapStateToProps(getState());
    },

    componentWillMount: function () {
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
