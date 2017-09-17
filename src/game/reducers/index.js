import { combineReducers } from 'redux';
import board from './board';
import user from './user';
// after the other reducers exist, import them all here

export default combineReducers({ board, user });
