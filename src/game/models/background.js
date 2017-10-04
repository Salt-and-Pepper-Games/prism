import Konva from 'konva';
import { colorValues } from '../colors';
import MutableNumber from '../../utils/MutableNumber';
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

		this.model.setZIndex(1);
	}

	setColor(color) {
		this.color = color;
		return new Promise(resolve => {
			let tween = new Konva.Tween({
				node: this.model,
				fill: colorValues[color],
				duration: 1,
				easing: Konva.Easings.EaseOut,
				onFinish: function() {
					console.log("BG FINISHED");
					this.destroy();
					resolve();
				}
			});
			tween.tween.duration = this.animTime;
			console.log("Animating to bgcolor: " + color);
			tween.play();
		});
	}

	// setAnimationMultiplier(n) {
	// 	this.animTime.set(this.baseAnimTime * 1000 / n);
	// }

	// destroy() {
	// 	this.model.destroy();
	// }
}

