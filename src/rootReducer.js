import { combineReducers } from 'redux';
import game from './game/reducers';
import ui from './ui/reducers';
import action from './actionReducer';

/**
 * The root reducer for the redux store
 *
 * @type {Function}
 */
export default combineReducers({ action, game, ui });
