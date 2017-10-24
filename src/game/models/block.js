import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues, altColorValues, shadowColorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import { switchOnAnimation, switchOffAnimation } from '../animations/switchAnimations';
import BaseModel from './baseModel';

export default class Block extends BaseModel {

	constructor(color, x, y, width, height, layer) {
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;
		let shadowOffsetRatio = .1;

		width = .8 * layer.width() / width;
		height = .8 * layer.height() / height;

		let model = new Konva.Rect({
			x: cellWidth * (x + .5) - width/2,
			y: cellHeight * (y + .5) - height/2,
			offsetX: width * shadowOffsetRatio,
			offsetY: height * shadowOffsetRatio,
			width: width,
			height: height,
			cornerRadius: 10,
			fill: colorValues[color],
			shadowBlur: 0,
			shadowColor: shadowColorValues[color],
			shadowOffsetX: width * shadowOffsetRatio,
			shadowOffsetY: height * shadowOffsetRatio,
		});
		super(color, model, layer);

		this.type = blockTypes.BLOCK;
		this.hasAltColor = false;
		this.shadowOffsetRatio = shadowOffsetRatio;
		
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
	}

	onBackgroundColor(color) {
		if (color === this.color && !this.hasAltColor) {
			let colorAnim = setColorAnimation(this.model, altColorValues[this.color], this.animTime);
			let switchAnim = switchOnAnimation(this.model, this.animTime);
			this.hasAltColor = true;
			return Promise.all([colorAnim.play(), switchAnim.play()]);
		}
		else if (color !== this.color && this.hasAltColor) {
			let colorAnim = setColorAnimation(this.model, colorValues[this.color], this.animTime);
			let switchAnim = switchOffAnimation(this.model, this.shadowOffsetRatio, this.animTime);
			this.hasAltColor = false;
			return Promise.all([colorAnim.play(), switchAnim.play()]);
		}
		else {
			return Promise.resolve();
		}
	}
}

