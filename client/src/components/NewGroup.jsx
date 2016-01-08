import React from 'react';

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
                    onClick={() => this.props.newGroup({
                        name: this.groupName
                    })}>
                    Submit
                </button>
            </div>
        )
    }
})
