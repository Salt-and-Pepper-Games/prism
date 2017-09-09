import Konva from 'konva';
import { colorValues } from '../colors';

export default class Block {
	constructor(color, x, y, width, height, layer) {
		this.color = color;
		this.x = x;
		this.y = y;

		this.model = new Konva.Rect({
			x: this.x / width * layer.width(),
			y: this.y / height * layer.height(),
			width: layer.width() / width,
			height: layer.height() / height,
			cornerRadius: 10,
			fill: colorValues[color]
		});

		layer.add(this.model);

		console.log(this);
	}

}

