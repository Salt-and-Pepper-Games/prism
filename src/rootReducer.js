import { combineReducers } from 'redux';
export { default as game } from './game/reducers';
export { default as ui } from './ui/reducers/ui';

/**
 * The root reducer for the redux store
 *
 * @type {Function}
 */
