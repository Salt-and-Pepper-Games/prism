import Konva from 'konva';
import { colorIndices, colorValues } from '../colors';

export default class Player {
	constructor(x, y, width, height, layer) {
		this.x = x;
		this.y = y;

		this.width = .8 * layer.width() / width;
		this.height = .8 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		console.log(x,y);

		this.model = new Konva.Rect({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			offsetX: this.width / 2,
			offsetY: this.height / 2,
			width: this.width,
			height: this.height,
			cornerRadius: 10,
			fill: colorValues[colorIndices.BLACK]
		});
		layer.add(this.model);
	}

	setPosition(x, y) {
		this.model.x = this.cellWidth * x + .5;
		this.model.y = this.cellHeight * y + .5;
	}
}

