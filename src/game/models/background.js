import Konva from 'konva';
import { colorValues, altColorValues } from '../colors';
import { setColorAnimation } from '../animations/colorAnimations';
import BaseModel from './baseModel';

export default class Background extends BaseModel {
	constructor(color, layer) {
		let width = layer.width();
		let height = layer.height();
		const model = new Konva.Group({
			x: 0,
			y: 0,
			width: layer.width(),
			height: layer.height()
		});

		const rect = new Konva.Rect({
			x: 0,
			y: 0,
			width: width,
			height: height,
			fill: colorValues[0]
		});

		const text = new Konva.Text({
			x: 0,
			y: 0,
			text: color.toString(),
			fontSize: height,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center',
			width: width,
			height: height,
		});



		// delegate the model fill function to the rect's
		model.fill = rect.fill.bind(rect);
		model.add(rect);
		// model.add(text);

		super(color, model, layer);
		this.text = text;
	}

	setColor(color) {
		this.color = color;
		// this.text.setText(color.toString());
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

