import React from 'react';
import { toJS } from 'immutable';

export default React.createClass({
    render: function () {
        console.log('Rendering Exclusions');

        let exclusions = this.props.exclusions.toJS();
        let list = Object.keys(exclusions).map(key => {
            return <li key={key}>{exclusions[key]}</li>;
        })

        return (
            <div>
                <h1>Current Exclusions</h1>
                <ul>{list}</ul>
            </div>
        )
    }
});
