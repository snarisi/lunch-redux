import React from 'react';
import createBroswerHistory from 'history/lib/createBrowserHistory';
import { dispatch, updater, getState } from '../store';

const history = createBroswerHistory();

export default React.createClass({
    groupName: '',

    contextTypes: {
        history: React.PropTypes.object.isRequired
    },

    componentWillMount: function () {
        updater.on('update', function (updates) {
            const id = updates.getIn(['group', '_id']);
            console.log(getState());
            history.push('/#/group/' + id);
        })
    },

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
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition(pos => {
                            dispatch({
                                type: 'NEW_GROUP',
                                group: {
                                    name: this.groupName,
                                    location: [
                                        pos.coords.latitude,
                                        pos.coords.longitude
                                    ]
                                }
                            });
                        });
                    }
                }>
                    Submit
                </button>
            </div>
        )
    }
})
