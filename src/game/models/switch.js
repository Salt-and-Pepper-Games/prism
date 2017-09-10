import Konva from 'konva';
import { blockTypes } from './board';
import { colorIndices, altColorValues, colorValues } from '../colors';

export default class Switch {
	constructor(color, x, y, width, height, layer) {
		this.type = blockTypes.SWITCH;
		this.color = color;
		this.pressed = false;
		this.hasAltColor = false;

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
			stroke: "rgba(30, 30, 30, .3)",
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

	onBackgroundColor(color) {
		const shouldBePressed = color & this.color;
		if (shouldBePressed && !this.isPressed) {
			let tween = new Konva.Tween({
				node: this.model,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				duration: .03
			});
			tween.play();
			this.isPressed = true;
		}
		else if (!shouldBePressed && this.isPressed) {
			let tween = new Konva.Tween({
				node: this.model,
				shadowBlur: 0,
				shadowOffsetX: this.width * .1,
				shadowOffsetY: this.height * .1,
				duration: .03
			});
			tween.play();
			this.isPressed = false;
		}
		// if (color === this.color) {
		// 	if (!this.hasAltColor) {
		// 		let tween = new Konva.Tween({
		// 			node: this.model,
		// 			fill: altColorValues[this.color],
		// 			duration: .35,
		// 		});
		// 		tween.play();
		// 		this.hasAltColor = true;
		// 	}
		// }
		// else {
		// 	if (this.hasAltColor) {
		// 		let tween = new Konva.Tween({
		// 			node: this.model,
		// 			fill: colorValues[this.color],
		// 			duration: .35,
		// 		});
		// 		tween.play();
		// 		this.hasAltColor = false;
		// 	}
		// }
	}
}

