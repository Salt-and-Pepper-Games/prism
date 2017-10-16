import { loadAnimation, destroyAnimation } from '../animations/levelAnimations';

export default class BaseModel {
	constructor(color, model, layer) {
		this.animTime = .15 * 1000;
		this.model = model;
		this.layer = layer;
		this.color = color;

		this.baseWidth = this.model.width();
		this.baseHeight = this.model.height();
		this.baseOffsetX = this.model.offsetX();
		this.baseOffsetY = this.model.offsetY();

		this.model.width(0);
		this.model.height(0);
		this.model.offsetX(this.baseOffsetX - this.baseWidth/2);
		this.model.offsetY(this.baseOffsetY - this.baseHeight/2);

		layer.add(model);
		layer.draw();
	}

	destroy() {
		return destroyAnimation(this.model, this.baseOffsetX - this.baseWidth/2, this.baseOffsetY - this.baseHeight/2, this.animTime).play()
			.then(() => {
				this.model.destroy();
			});
	}

	onLoad() {
		return loadAnimation(this.model, this.baseWidth, this.baseHeight, this.baseOffsetX, this.baseOffsetY, this.animTime).play();
	}
}
