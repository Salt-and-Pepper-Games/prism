import { combineReducers } from 'redux';
import game from './game/reducers';
import ui from './ui/reducers';

export default combineReducers({ game, ui });
