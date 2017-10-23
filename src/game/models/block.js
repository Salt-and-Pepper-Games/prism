import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues, altColorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import { switchOnAnimation, switchOffAnimation } from '../animations/switchAnimations';
import BaseModel from './baseModel';

export default class Block extends BaseModel {

	constructor(color, x, y, width, height, layer) {
		// let cellWidth = layer.width() / width;
		// let cellHeight = layer.height() / height;

		// width = .9 * layer.width() / width;
		// height = .9 * layer.height() / height;


		// let model = new Konva.Group({
		// 	x: cellWidth * (x + .5),
		// 	y: cellHeight * (y + .5),
		// 	offsetX: width / 2,
		// 	offsetY: height / 2,
		// 	opacity: .95
		// });

		// const rect = new Konva.Rect({
		// 	x: 0,
		// 	y: 0,
		// 	width: width,
		// 	height: height,
		// 	cornerRadius: 10,
		// 	fill: colorValues[this.color]
		// });


		// const text = new Konva.Text({
		// 	x: 0,
		// 	y: 0,
		// 	text: color,
		// 	fontSize: height,
		// 	fontFamily: 'Calibri',
		// 	fill: colorValues[color],
		// 	align: 'center',
		// 	width: width,
		// 	height: height,
		// });
		// // delegate the model fill function to the rect's
		// model.fill = rect.fill.bind(rect);

		// model.add(rect);
		// model.add(text);

		// super(color, model, layer);
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;
		let shadowOffsetRatio = .1;
		width = .8 * layer.width() / width;
		height = .8 * layer.height() / height;

		const model = new Konva.Group({
			x: cellWidth * (x + .5),
			y: cellHeight * (y + .5),
			width: width,
			height: height,
			offsetX: width * shadowOffsetRatio,
			offsetY: height * shadowOffsetRatio,
		});

		const rect = new Konva.Rect({
			x: 0,
			y: 0,
			width,
			height,
			fill: colorValues[color],
			// stroke: "rgba(30, 30, 30, .3)",
			shadowBlur: 0,
			shadowColor: "#000000",
			shadowOffsetX: width * shadowOffsetRatio,
			shadowOffsetY: height * shadowOffsetRatio,
			cornerRadius: 10,
			offsetX: width/2,
			offsetY: height/2
		});

		Object.assign(model, {
			shadowOffsetX: rect.shadowOffsetX.bind(rect),
			shadowOffsetY: rect.shadowOffsetY.bind(rect),
			shadowBlur: rect.shadowBlur.bind(rect),
			fill: rect.fill.bind(rect)
		});
		

		const text = new Konva.Text({
			x: 0,
			y: 0,
			offsetX: width/2,
			offsetY: height/2,
			text: color,
			fontSize: height,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center',
			width: width,
			height: height,
		});
		// // delegate the model fill function to the rect's
		// model.fill = rect.fill.bind(rect);

		model.add(rect);
		model.add(text);
		super(color, model, layer);

		this.type = blockTypes.BLOCK;
		this.hasAltColor = false;
		
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.shadowOffsetRatio = .1;
	}

	onBackgroundColor(color) {
		// const shouldBePressed = color & this.color;
		// if (shouldBePressed && !this.isPressed) {
		// 	this.isPressed = true;
		// 	return switchOnAnimation(this.model, this.animTime).play();
		// }
		// else if (!shouldBePressed && this.isPressed) {
		// 	this.isPressed = false;
		// 	return switchOffAnimation(this.model, this.shadowOffsetRatio, this.animTime).play();
		// }

		if (color === this.color && !this.hasAltColor) {
			// let anim = setColorAnimation(this.model, altColorValues[this.color], this.animTime);
			this.hasAltColor = true;
			return switchOnAnimation(this.model, this.animTime).play();
			// return anim.play();
		}
		else if (color !== this.color && this.hasAltColor) {
			// let anim = setColorAnimation(this.model, colorValues[this.color], this.animTime);
			this.hasAltColor = false;
			return switchOffAnimation(this.model, this.shadowOffsetRatio, this.animTime).play();
			// return anim.play();
		}
		else {
			return Promise.resolve();
		}
	}
}

