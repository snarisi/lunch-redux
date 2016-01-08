export function setState(state) {
    console.log('someone called setState');

    return {
        type: 'SET_STATE',
        state: state
    };
}

export function newGroup (group) {
    console.log('someone called newGroup');
    return {
        type: 'NEW_GROUP',
        group: group
    };
}

export function exclude (category) {
    console.log('someone called exclude');

    return {
        type: 'EXCLUDE',
        category: category
    }
}
