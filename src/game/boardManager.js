import Konva from 'konva';
import types from '../actionCreators/levelActionNames.js';
import { addStateListener } from './game';
import Board from './models/board';

/**
 * Higher order redux-connected class to wrap around a board
 * Basically the non-react equivalent of react-redux's connect()
 * BoardManager gets notified on every state change and animation frame
 * It then delegates to the current board instance to render the changes
 */
export default class BoardManager {
	board = null;

	constructor(stage) {
		this.stopStateListener = addStateListener(this.onStateChange.bind(this));

		// where we will put background and blocks
		this.boardLayer = new Konva.Layer();
		// where we will put switches
		this.switchLayer = new Konva.Layer();
		// where we will put player and enemies
		this.playerLayer = new Konva.Layer();

		stage.add(this.boardLayer);
		stage.add(this.switchLayer);
		stage.add(this.playerLayer);

		this.stage = stage;
	}

	onStateChange({ game, action }) {
		if (action.type === types.LOAD_LEVEL) {
			this.board = new Board(game.board, { boardLayer: this.boardLayer,
				playerLayer: this.playerLayer,
				switchLayer: this.switchLayer });
			this.stage.draw();
		}
		else if (this.board) {
			// handle other actions here
		}
		else {
			// receiving an action without a level loaded
			// could be a ui action or something, just ignore it
		}
	}
}
