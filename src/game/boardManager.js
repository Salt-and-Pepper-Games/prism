import Konva from 'konva';

import types from '../actionCreators/levelActionNames.js';
import uiActionCreators from '../actionCreators/uiActionCreators';
import {loadLevel, closeLevelAction, completeLevelAction} from '../actionCreators/levelActionCreators';
import { loadLevelString } from '../actionCreators/asyncActionCreators';
import { saveData } from '../utils/firebaseListeners';
import backgroundTypes from '../actionCreators/backgroundActionNames';
import { setBackgroundColor } from '../actionCreators/backgroundActionCreators';
import { addStateListener } from './game';
import Board from './models/board';
import isEqual from 'lodash.isequal';
import { push } from 'react-router-redux';

/**
 * Higher order redux-connected class to wrap around a board
 * Basically the non-react equivalent of react-redux's connect()
 * BoardManager gets notified on every state change and animation frame
 * It then delegates to the current board instance to render the changes
 */
export default class BoardManager {
	board = null;

	constructor(stage, dispatch) {
		this.stopStateListener = addStateListener(this.onStateChange.bind(this));
		// is this bad practice? how else do i get at the store?
		this.dispatch = dispatch;

		// where we will put background and blocks
		this.boardLayer = new Konva.Layer();
		// give background rounded edges
		this.boardLayer.canvas._canvas.style.borderRadius = '1em';
		// where we will put switches
		this.switchLayer = new Konva.Layer();
		// where we will put player and enemies
		this.playerLayer = new Konva.Layer();

		stage.add(this.boardLayer);
		stage.add(this.playerLayer);
		stage.add(this.switchLayer);

		this.stage = stage;
	}

	onStateChange(state, prevState) {
		const { game } = state;
		let prevGame = prevState.game;
		// if (action.type === types.LOAD_LEVEL) {
		if (!isEqual(prevGame.board.levelNumber, game.board.levelNumber) ||
				!isEqual(prevGame.board.packInfo, game.board.packInfo)) {
			if (this.board) {
				this.board.destroy();
			}
			this.board = new Board(game.board, { boardLayer: this.boardLayer,
				playerLayer: this.playerLayer,
				switchLayer: this.switchLayer });
			this.stage.draw();
		}
		else if (this.board) {
			// handle other actions here
			const px = game.board.player.x;
			const py = game.board.player.y;
			const prevPx = prevGame.board.player.x;
			const prevPy = prevGame.board.player.y;
			const didMove = (px !== prevPx) || (py !== prevPy);

			const bg = game.board.background;
			const prevBg = prevGame.board.background;
			const didBgChange = bg !== prevBg;

			// Check if the player actually moved before changing switch color.
			if (didMove) {
				this.board.setPlayerPosition(px, py);
				if (px === game.board.home.x && game.board.home.y === py && !game.board.complete) {
					// in the future dispatch a level end action but for now just cut to home screen
					this.dispatch(completeLevelAction());
					saveData(state, this.dispatch);
					if (game.board.levelNumber < game.board.packInfo.levelCount - 1) {
						// figure out how to navigate to a new url here
						this.dispatch(push(`/game/${game.board.packInfo.packName}/${parseInt(game.board.levelNumber, 10) + 1}`));
						// this.dispatch(loadLevelString(game.board.levelNumber + 1, game.board.packInfo.packName));
					}
					else {
						this.dispatch(closeLevelAction());
						this.dispatch(uiActionCreators.closeGameMode());
						this.dispatch(push(`/`));
					}
				}
			}
			if (didBgChange) {
				this.board.setBackgroundColor(game.board.background);
			}
		}
		else {
			// receiving an action without a level loaded
			// could be a ui action or something, just ignore it
		}
	}
}
