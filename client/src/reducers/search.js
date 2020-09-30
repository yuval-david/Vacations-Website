const searchReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SEARCH':
            return state + 1;
        case 'CLEAR':
            return state = 0;
        default:
            return state
    }
}

export default searchReducer;