import Konva from 'konva';
import { colorValues } from '../colors';

export default class Background {
	constructor(color, layer) {
		this.color = color;

		this.model = new Konva.Rect({
			x: 0,
			y: 0,
			width: layer.width(),
			height: layer.height(),
			fill: colorValues[color]
		});

		layer.add(this.model);
		this.model.setZIndex(1);
	}

	setColor(color) {
		this.color = color;
		this.model.to({
			fill: colorValues[color],
			duration: .35,
			easing: Konva.Easings.EaseOut
		});
	}

	destroy() {
		this.model.destroy();
	}
}

