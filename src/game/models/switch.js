import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues } from '../colors';

export default class Switch {
	constructor(color, x, y, width, height, layer) {
		this.type = blockTypes.SWITCH;
		this.color = color;
		this.x = x;
		this.y = y;

		this.width = .5 * layer.width() / width;
		this.height = .5 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		this.model = new Konva.Rect({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			offsetX: this.width / 2,
			offsetY: this.height / 2,
			width: this.width,
			height: this.height,
			cornerRadius: 10,
			fill: colorValues[color],
			shadowBlur: 0,
			shadowColor: "#000000",
			shadowOffsetX: this.width * .1,
			shadowOffsetY: this.height * .1,
		});

		// this.model =  new Konva.Circle({
		// 	x: this.cellWidth * (x + .5),
		// 	y: this.cellHeight * (y + .5),
		// 	radius: this.width / 2,
		// 	fill: colorValues[colorIndices.WHITE]
		// });

		layer.add(this.model);
	}
}

