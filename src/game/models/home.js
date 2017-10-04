import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';
import BaseModel from './baseModel';

export default class Home extends BaseModel {
	constructor(x, y, width, height, layer) {
		let color = colorIndices.WHITE;
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;
		width = .7 * layer.width() / width;
		height = .7 * layer.height() / height;
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

		this.hasAltColor = false;
		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.x = x;
		this.y = y;


		// setTimeout(() => {
		// 	layer.add(this.model);
		// 	layer.draw();
		// }, 0);
	}


	onBackgroundColor(color) {
		const homeColor = colorIndices.WHITE;

		if (color === homeColor && !this.hasAltColor) {
			let tween = new Konva.Tween({
				node: this.model,
				fill: altColorValues[this.color],
				duration: .35,
			});
			tween.play();
			this.hasAltColor = true;
		}
		else if (color !== homeColor && this.hasAltColor) {
			let tween = new Konva.Tween({
				node: this.model,
				fill: colorValues[this.color],
				duration: .35,
			});
			tween.play();
			this.hasAltColor = false;
		}
	}

	// destroy() {
	// 	this.model.destroy();
	// }
}

