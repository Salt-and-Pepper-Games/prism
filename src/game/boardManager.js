import Konva from 'konva';

import * as uiActionCreators from '../actionCreators/uiActionCreators';
import { completeLevelAction } from '../actionCreators/levelActionCreators';
import { saveData } from '../utils/firebaseListeners';
import { addStateListener } from './game';
import Board from './models/board';
import isEqual from 'lodash.isequal';
import { push } from 'react-router-redux';
import AnimationManager from './animations/animationManager';
import GameAudio from '../utils/AudioManager';
import playerActionNames from '../actionCreators/playerActionNames';
const playerMoves = Object.keys(playerActionNames);
/**
 * Higher order redux-connected class to wrap around a board
 * Basically the non-react equivalent of react-redux's connect()
 * BoardManager gets notified on every state change and animation frame
 * It then delegates to the current board instance to render the changes
 */
export default class BoardManager {
	board = null;

	constructor(stage, dispatch) {
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

		this.animationManager = new AnimationManager();
	}

	startStateListener(dispatch) {
		this.stopStateListener = addStateListener(this.onStateChange.bind(this));
		// is this bad practice? how else do i get at the store?
		this.dispatch = dispatch;
	}

	onStateChange(state, prevState) {
		const { game } = state;
		let prevGame = prevState.game;

		if (!isEqual(prevGame.board.levelNumber, game.board.levelNumber) ||
				!isEqual(prevGame.board.packInfo, game.board.packInfo)) {
			if (this.board) {
				const levelEndID = GameAudio.play('level_end');
				GameAudio.volume(state.ui.sound.soundOn ? 1.0 : 0.0, levelEndID);
				// this.board.destroy();
				let animFrame = {
					destroy: this.board
				};
				this.animationManager.addFrame(animFrame);
			}
			this.board = new Board(game.board, { boardLayer: this.boardLayer,
				playerLayer: this.playerLayer,
				switchLayer: this.switchLayer });
			this.animationManager.addFrame({
				board: this.board,
				stage: this.stage
			});
			// this.animationManager.setBoard(this.board);
			// this.stage.draw();
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

			const animFrame = {};
			// Check if the player actually moved before changing switch color.
			if (didMove) {
				// this.board.setPlayerPosition(px, py);
				animFrame.player = { x: px, y: py };
				if (px === game.board.home.x && game.board.home.y === py && !game.board.complete) {
					// in the future dispatch a level end action but for now just cut to home screen
					this.dispatch(completeLevelAction());
					saveData(state, this.dispatch);
					if (game.board.levelNumber < game.board.packInfo.levelCount) {
						// figure out how to navigate to a new url here
						// if (playerMoves.includes(state.lastAction.type)) {
						// 	const levelEndID = GameAudio.play('level_end');
						// 	GameAudio.volume(state.ui.sound.soundOn ? 1.0 : 0.0, levelEndID);
						// }
						this.dispatch(push(`/game/${game.board.packInfo.packName}/${parseInt(game.board.levelNumber, 10) + 1}`));
						// this.dispatch(loadLevelString(game.board.levelNumber + 1, game.board.packInfo.packName));
					}
					else {
						this.dispatch(uiActionCreators.togglePackComplete());
						// this.dispatch(closeLevelAction());
						// this.dispatch(uiActionCreators.closeGameMode());
						// this.dispatch(push(`/`));
					}
				} else if (didBgChange) {
					animFrame.background = bg;
					if (playerMoves.includes(state.lastAction.type)) {
						const switchID = GameAudio.play('switch_toggle');
						GameAudio.volume(state.ui.sound.soundOn ? 1.0 : 0.0, switchID);
					}
				} else {
					if (playerMoves.includes(state.lastAction.type)) {
						const moveID = GameAudio.play('move');
						GameAudio.volume(state.ui.sound.soundOn ? 1.0 : 0.0, moveID);
					}
				}
			} else if (!didBgChange && !didMove) {
				if (playerMoves.includes(state.lastAction.type)) {
					const moveBlockedID = GameAudio.play('move_blocked');	
					GameAudio.volume(state.ui.sound.soundOn ? 1.0 : 0.0, moveBlockedID);
				}
			}
			
			this.animationManager.addFrame(animFrame);
		}
		else {
			// receiving an action without a level loaded
			// could be a ui action or something, just ignore it
		}
	}
}
