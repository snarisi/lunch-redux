import React from 'react';
import { filterOptions, getTopOption } from '../core';

export default React.createClass({
    getTopOption: function () {
        return filterOptions(
            this.props.allOptions,
            this.props.exclusions
        ).first();
    },

    render: function () {
        console.log('Rendering Top Choice');
        let top = this.getTopOption();
        let name = top ? top.get('name') : 'Waiting for Yelp...';
        let address = top ? top.getIn(['location', 'address']) : null;
        let rating = top ? top.get('rating') : null;
        return (
            <div>
                <h1>Current Top Choice</h1>
                <p>{name}</p>
                <p>{address}</p>
                <p>{rating}</p>
            </div>
        )
    }
})
