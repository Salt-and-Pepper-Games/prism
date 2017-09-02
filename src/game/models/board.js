import { addAnimationListener } from '../../game';

export default class Board {
	constructor(boardData) {
		this.boardData = boardData;
		this.stopAnimation = addAnimationListener(this.render.bind(this));
	}

	render(ctx, time) {

	}

	movePlayer(x, y) {

	}
}
