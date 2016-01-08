export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

export function newGroup (group) {
    return {
        type: 'NEW_GROUP',
        group: group
    };
}
