import Konva from 'konva';
import { blockTypes } from './board';
import { altColorValues, colorValues } from '../colors';
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

		const model = new Konva.Group({
			x: cellWidth * (x + .5),
			y: cellHeight * (y + .5),
			width: width,
			height: height,
			offsetX: width * shadowOffsetRatio,
			offsetY: height * shadowOffsetRatio,
		});

		const circle = new Konva.Circle({
			x: 0,
			y: 0,
			radius: cellWidth / 4,
			// fill: colorValues[7],
			fill: colorValues[color],
			// stroke: "rgba(30, 30, 30, .3)",
			shadowBlur: 0,
			shadowColor: "#000000",
			shadowOffsetX: width * shadowOffsetRatio,
			shadowOffsetY: height * shadowOffsetRatio,
		});

		Object.assign(model, {
			shadowOffsetX: circle.shadowOffsetX.bind(circle),
			shadowOffsetY: circle.shadowOffsetY.bind(circle),
			shadowBlur: circle.shadowBlur.bind(circle),
			fill: circle.fill.bind(circle)
		});
		

		const text = new Konva.Text({
			x: 0,
			y: 0,
			offsetX: width/2,
			offsetY: width/4,
			text: '+' + color,
			// text: color,
			fontSize: width/2,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center',
			width: width,
			height: height,
		});
		// // delegate the model fill function to the rect's
		// model.fill = rect.fill.bind(rect);

		model.add(circle);
		model.add(text);
		super(color, model, layer);
		
		this.text = text;
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
			this.text.setText('-' + this.color);
			// this.text.setText((color - this.color).toString());
			anims.push(switchOnAnimation(this.model, this.animTime).play());
			this.isPressed = true;
		}
		else if (!shouldBePressed && this.isPressed) {
			this.text.setText('+' + this.color);
			// this.text.setText((color + this.color).toString());
			anims.push(switchOffAnimation(this.model, this.shadowOffsetRatio, this.animTime).play());
			this.isPressed = false;
		}
		// if (this.isPressed) {
		// 	this.text.setText((color - this.color).toString());
		// }
		// else {
		// 	this.text.setText((color + this.color).toString());
		// }

		// if (color === this.color) {
		// 	if (!this.hasAltColor) {
		// 		anims.push(setColorAnimation(this.model, altColorValues[7], this.animTime).play());
		// 		this.hasAltColor = true;
		// 	}
		// }
		// else {
		// 	if (this.hasAltColor) {
		// 		anims.push(setColorAnimation(this.model, colorValues[7], this.animTime).play());
		// 		this.hasAltColor = false;
		// 	}
		// }
		return Promise.all(anims);
	}
}

