import React from 'react';
import { Map, List, toJS } from 'immutable';

export default React.createClass({
    render: function () {
        let exclusions = this.props.exclusions || Map();
        exclusions = exclusions.toJS();
        let currentExclusions = Object.keys(exclusions).map(key => {
            return <li key={key}>{exclusions[key]}</li>
        });

        console.log('rendering GroupInfo');
        return (
            <div>
                <h1>{this.props.group.get('name')}</h1>
                <ul>Current Exclusions:
                    {currentExclusions}
                </ul>
            </div>
        );
    }
})
