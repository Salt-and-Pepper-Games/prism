import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues, altColorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import BaseModel from './baseModel';

export default class Block extends BaseModel {

	constructor(color, x, y, width, height, layer) {
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;

		width = .9 * layer.width() / width;
		height = .9 * layer.height() / height;

		let model = new Konva.Rect({
			x: cellWidth * (x + .5),
			y: cellHeight * (y + .5),
			offsetX: width / 2,
			offsetY: height / 2,
			width: width,
			height: height,
			cornerRadius: 10,
			fill: colorValues[color]
		});
		super(color, model, layer);

		this.type = blockTypes.BLOCK;
		this.hasAltColor = false;
		
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
	}

	onBackgroundColor(color) {
		if (color === this.color && !this.hasAltColor) {
			let anim = setColorAnimation(this.model, altColorValues[this.color], this.animTime);
			this.hasAltColor = true;
			return anim.play();
		}
		else if (color !== this.color && this.hasAltColor) {
			let anim = setColorAnimation(this.model, colorValues[this.color], this.animTime);
			this.hasAltColor = false;
			return anim.play();
		}
		else {
			return Promise.resolve();
		}
	}
}

