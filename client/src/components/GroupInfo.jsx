import React from 'react';

export default React.createClass({
    render: function () {
        let currentExclusions = (this.props.exclusions) ?
        this.props.exclusions.map(exclusion => <li key={exclusion}>{exclusion}</li>) :
        [];

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
