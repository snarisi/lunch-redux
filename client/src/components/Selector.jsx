import React from 'react';
import { store } from '../index.jsx';
import { List, Map, toJS } from 'immutable';

export default React.createClass({
    getCategories: function () {
        if (!this.props.allOptions) return;

        let allCats = {};

        this.props.allOptions.forEach(option => {
            option.get('categories').toJS().forEach(category => {
                if (!allCats[category.id]) allCats[category.id] = category.display;
            })
        })
        return allCats;
    },

    makeList: function () {
        if (!this.props.allOptions) return;
        let categories = this.getCategories();
        return Object.keys(categories).map(id => {
            let newExclusion = {};
            newExclusion[id] = categories[id];
            return (
                <li
                    value={id}
                    key={id}
                    onClick={() => {
                        store.dispatch({
                            type: 'EXCLUDE',
                            category: newExclusion
                        })
                    }}>
                    {categories[id]}
                </li>
            )
        })
    },

    render: function () {
        return (
            <div>
                <h1>Selector</h1>
                <p>Pick the food you hate the most.</p>
                <ul>
                    {this.makeList()}
                </ul>
            </div>
        );
    }
});
