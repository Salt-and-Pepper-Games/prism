import types from './actions/types';
import { addAnimationListener, addStateListener } from './game';
import Board from './models/board';

/**
 * Higher order redux-connected class to wrap around a board
 * Basically the non-react equivalent of react-redux's connect()
 * BoardManager gets notified on every state change and animation frame
 * It then delegates to the current board instance to render the changes
 */
export default class BoardManager {
	board = null

	constructor() {
		this.stopStateListener = addStateListener(this.onStateChange.bind(this));
		this.stopAnimationListener = addAnimationListener(this.render.bind(this));
	}

	render(ctx, time) {
		if (this.board) {
			this.board.render(ctx, time);
		}
	}

	onStateChange({ game, action }) {
		if (action.type === types.LOAD_LEVEL) {
			console.log("New board state");
			console.log(game.board);
			this.board = new Board(game.board);
		}
	}
}
