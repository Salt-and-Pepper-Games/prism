import MutableNumber from '../../utils/MutableNumber';

export default class BaseModel {
	constructor(color, model, layer) {
		this.baseAnimTime = .15;
		this.animTime = new MutableNumber(this.baseAnimTime * 1000);
		this.model = model;
		this.layer = layer;
		this.color = color;
		layer.add(model);
	}

	destroy() {
		this.model.destroy();
	}
}
