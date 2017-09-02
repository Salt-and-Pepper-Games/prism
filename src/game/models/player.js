import { addAnimationListener } from '../../game';

export default class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.stopAnimation = addAnimationListener(this.render.bind(this));
	}

	render(ctx, time) {
	}
}

