import React from 'react';

export default React.createClass({
    render: function () {
        console.log('rendering admin');
        return (
            <div>
                <h1>Admin</h1>
                <p>Votes in: {this.props.exclusions.size}</p>
                <button>Close</button>
            </div>
        )
    }
})
