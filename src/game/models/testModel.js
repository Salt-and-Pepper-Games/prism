import { addAnimationListener } from '../../game';

export default class TestModel {
	constructor() {
		this.stopAnimation = addAnimationListener(this.render.bind(this));
	}

	render(ctx, time) {
		if (time > 1000) {
			this.stopAnimation();
		}
	}
}
