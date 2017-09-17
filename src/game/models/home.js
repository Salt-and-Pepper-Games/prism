import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';

export default class Player {
	constructor(x, y, width, height, layer) {
		this.color = colorIndices.WHITE;
		this.hasAltColor = false;

		this.x = x;
		this.y = y;

		this.width = .7 * layer.width() / width;
		this.height = .7 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		setTimeout(() => {
			this.model = new Konva.Rect({
				x: this.cellWidth * (x + .5),
				y: this.cellHeight * (y + .5),
				offsetX: this.width / 2,
				offsetY: this.height / 2,
				width: this.width,
				height: this.height,
				cornerRadius: 10,
				fill: colorValues[this.color]
			});
			layer.add(this.model);
			layer.draw();
		}, 0);
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

	destroy() {
		this.model.destroy();
	}
}

