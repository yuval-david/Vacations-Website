import { combineReducers } from "redux";
import isLoggedReducer from './isLogged';
import isAdminReducer from './isAdmin';
import followReducer from './follow';
import searchReducer from './search';
//import Reduce 1
//import Reduce 2


const allReducers = combineReducers({
    /* List of all the reducers */
    isLogged: isLoggedReducer,
    isAdmin: isAdminReducer,
    followRed: followReducer,
    isSearch: searchReducer
});

export default allReducers;