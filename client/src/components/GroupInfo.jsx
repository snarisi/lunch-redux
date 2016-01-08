import React from 'react';
import { Map, List, toJS } from 'immutable';

export default React.createClass({
    render: function () {
        let exclusions = this.props.exclusions || Map();
        exclusions = exclusions.toJS();
        console.log(exclusions);
        let currentExclusions = Object.keys(exclusions).map(key => {
            return <li key={key}>{exclusions[key]}</li>
        });

        return (
            <div>
                <h1>{this.props.name}</h1>
                <ul>Current Exclusions:
                    {currentExclusions}
                </ul>
            </div>
        );
    }
})
