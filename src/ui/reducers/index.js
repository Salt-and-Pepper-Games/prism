const { combineReducers } =  require('redux');
// after the other reducers exist, import them all here
const dummy = (state={}, action) => state;

module.exports = combineReducers({ dummy });
