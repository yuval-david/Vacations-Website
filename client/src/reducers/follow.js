
const followReducer = (state = 0, action) => {
    switch (action.type) {
        case 'FOLLOW':
            return state + 1;
        case 'NOT-FOLLOW':
            return state - 1;
        default:
            return state
    }
}

export default followReducer;