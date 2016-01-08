import React from 'react';
import { dispatch } from '../store';

export default React.createClass({
    groupName: '',

    watchForm: function (event) {
        this.groupName = event.target.value;
    },

    render: function () {
        return (
            <div>
                <h3>Start a new group</h3>
                <h3>Find a place no one hates</h3>
                <input
                    type="text"
                    placeholder="Group name..."
                    onChange={this.watchForm}
                />
                <button
                    onClick={() => dispatch({
                        type: 'NEW_GROUP',
                        group: { name: this.groupName }
                    })}>
                    Submit
                </button>
            </div>
        )
    }
})
