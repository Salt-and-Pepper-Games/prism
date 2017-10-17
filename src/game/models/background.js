import Konva from 'konva';
import { colorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import BaseModel from './baseModel';

export default class Background extends BaseModel {
	constructor(color, layer) {
		let model = new Konva.Rect({
			x: 0,
			y: 0,
			width: layer.width(),
			height: layer.height(),
			fill: colorValues[color]
		});
		super(color, model, layer);
	}

	setColor(color) {
		this.color = color;
		return setColorAnimation(this.model, colorValues[this.color], this.animTime).play();
		// return new Promise(resolve => {
		// 	let tween = new Konva.Tween({
		// 		node: this.model,
		// 		fill: colorValues[color],
		// 		duration: 1,
		// 		easing: Konva.Easings.EaseOut,
		// 		onFinish: function() {
		// 			this.destroy();
		// 			resolve();
		// 		}
		// 	});
		// 	tween.tween.duration = this.animTime;
		// 	tween.play();
		// });
	}

	// setAnimationMultiplier(n) {
	// 	this.animTime.set(this.baseAnimTime * 1000 / n);
	// }

	// destroy() {
	// 	this.model.destroy();
	// }
}

