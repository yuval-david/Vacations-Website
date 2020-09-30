
const isAdminReducer = (state = false, action) => {
    switch (action.type) {
        case 'ADMIN':
            return (state = true);
        case 'NOT-ADMIN':
            return (state = false);
        default:
            return state
    }
}

export default isAdminReducer;