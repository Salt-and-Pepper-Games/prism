import types from '../actionCreators/levelActionNames.js';
import { addAnimationListener, addStateListener } from './game';
import Board from './models/board';

/**
 * Higher order redux-connected class to wrap around a board
 * Basically the non-react equivalent of react-redux's connect()
 * BoardManager gets notified on every state change and animation frame
 * It then delegates to the current board instance to render the changes
 */
export default class BoardManager {
	board = null;

	constructor() {
		this.stopStateListener = addStateListener(this.onStateChange.bind(this));
		this.stopAnimationListener = addAnimationListener(this.render.bind(this));
	}

	render(ctx, time) {
		if (this.board) {
			dimensions = {
				screenWidth: ctx.canvas.width,
				screenHeight: ctx.canvas.height,
				width: this.board.width,
				height: this.board.height
			};
			this.board.render(ctx, time, dimensions);
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
