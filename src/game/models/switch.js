import Konva from 'konva';
import { blockTypes } from './board';
import { colorIndices, altColorValues, colorValues } from '../colors';
import { switchOnAnimation, switchOffAnimation } from '../animations/switchAnimations';
import { setColorAnimation } from '../animations/colorAnimations';
import BaseModel from './baseModel';

export default class Switch extends BaseModel {
	constructor(color, x, y, width, height, layer) {
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;
		let shadowOffsetRatio = .1;
		width = .5 * layer.width() / width;
		height = .5 * layer.height() / height;

		let model = new Konva.Circle({
			x: cellWidth * (x + .5),
			y: cellHeight * (y + .5),
			radius: cellWidth / 4,
			fill: colorValues[color],
			// stroke: "rgba(30, 30, 30, .3)",
			shadowBlur: 0,
			shadowColor: "#000000",
			shadowOffsetX: width * shadowOffsetRatio,
			shadowOffsetY: height * shadowOffsetRatio,
			offsetX: width * shadowOffsetRatio,
			offsetY: height * shadowOffsetRatio,
		});
		super(color, model, layer);
		
		this.type = blockTypes.SWITCH;
		this.color = color;
		this.pressed = false;
		this.hasAltColor = false;

		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.shadowOffsetRatio = shadowOffsetRatio;

		// this.model = new Konva.Rect({
		// 	x: this.cellWidth * (x + .5),
		// 	y: this.cellHeight * (y + .5),
		// 	offsetX: this.width / 2,
		// 	offsetY: this.height / 2,
		// 	width: this.width,
		// 	height: this.height,
		// 	cornerRadius: 10,
		// 	fill: colorValues[color],
		// 	// stroke: "rgba(30, 30, 30, .3)",
		// 	shadowBlur: 0,
		// 	shadowColor: "#000000",
		// 	shadowOffsetX: this.width * .1,
		// 	shadowOffsetY: this.height * .1,
		// });


		layer.add(this.model);
	}

	onBackgroundColor(color) {
		const anims = [];
		const shouldBePressed = color & this.color;
		if (shouldBePressed && !this.isPressed) {
			anims.push(switchOnAnimation(this.model, this.animTime).play());
			this.isPressed = true;
		}
		else if (!shouldBePressed && this.isPressed) {
			anims.push(switchOffAnimation(this.model, this.shadowOffsetRatio, this.animTime).play());
			this.isPressed = false;
		}
		if (color === this.color) {
			if (!this.hasAltColor) {
				anims.push(setColorAnimation(this.model, altColorValues[this.color], this.animTime).play());
				this.hasAltColor = true;
			}
		}
		else {
			if (this.hasAltColor) {
				anims.push(setColorAnimation(this.model, colorValues[this.color], this.animTime).play());
				this.hasAltColor = false;
			}
		}
		return Promise.all(anims)
			.then(() => { console.log("Switch animations all done") });
	}
}

