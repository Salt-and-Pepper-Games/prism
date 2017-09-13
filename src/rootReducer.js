import { combineReducers } from 'redux';
import game from './game/reducers';
import ui from './ui/reducers/ui.js';

/**
 * The root reducer for the redux store
 *
 * @type {Function}
 */
export default combineReducers({ game, ui });
