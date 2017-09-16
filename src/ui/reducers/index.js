import { combineReducers } from 'redux';
// after the other reducers exist, import them all here
const dummy = (state={}, action) => state;

export default combineReducers({ dummy });
