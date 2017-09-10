import Konva from 'konva';
import { colorIndices, colorValues } from '../colors';

export default class Player {
	constructor(x, y, width, height, layer) {
		this.x = x;
		this.y = y;

		this.width = .5 * layer.width() / width;
		this.height = .5 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		// this.model = new Konva.Rect({
		// 	x: this.cellWidth * (x + .5),
		// 	y: this.cellHeight * (y + .5),
		// 	offsetX: this.width / 2,
		// 	offsetY: this.height / 2,
		// 	width: this.width,
		// 	height: this.height,
		// 	cornerRadius: 10,
		// 	fill: colorValues[colorIndices.WHITE]
		// });

		this.model =  new Konva.Circle({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			radius: this.width / 2,
			fill: colorValues[colorIndices.WHITE]
		});

		layer.add(this.model);
	}

	moveTo(x, y) {
		this.x = x;
		this.y = y;
		let tween = new Konva.Tween({
			node: this.model,
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			duration: .35,
			easing: Konva.Easings.EaseOut
		});
		tween.play();
	}
}

