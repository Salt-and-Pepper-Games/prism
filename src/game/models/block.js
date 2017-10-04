import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues, altColorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import MutableNumber from '../../utils/MutableNumber';
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

		this.model = model;

		// TODO: fix this weird bug
		// if you take out the setTimeout stuff, the block at (0, 5) won't display
		// it'll load fine, but it won't render
		// it's the first block added to the layer so it's gotta be that something in the layer
		// is not ready
		// setTimeout(() => {
		// 	layer.add(this.model);
		// 	layer.draw();
		// }, 0);
	}

	onBackgroundColor(color) {
		if (color === this.color && !this.hasAltColor) {
			let anim = setColorAnimation(this.model, altColorValues[this.color], this.animTime);
			// this.model.to({
			// 	fill: altColorValues[this.color],
			// 	duration: .35,
			// });
			this.hasAltColor = true;
			return anim.play();
		}
		else if (color !== this.color && this.hasAltColor) {
			let anim = setColorAnimation(this.model, colorValues[this.color], this.animTime);
			// this.model.to({
			// 	fill: colorValues[this.color],
			// 	duration: .35,
			// });
			this.hasAltColor = false;
			return anim.play();
		}
		else {
			return Promise.resolve();
		}
	}

	// setAnimationMultiplier(n) {
	// 	this.animDuration.set(this.baseAnimDuration * 1000 / n);
	// }
	
	// destroy() {
	// 	this.model.destroy();
	// }
}

