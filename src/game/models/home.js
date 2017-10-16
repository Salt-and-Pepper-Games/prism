import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';
import BaseModel from './baseModel';
import { setImageColorAnimation } from '../animations/colorAnimations';

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
			fill: colorValues[color],
			stroke: "#000000",
			strokeWeight: 5
		});
		// model.opacity(0);

		super(color, model, layer);

		let imageObj = new Image();
		imageObj.onload = () => {
			model.destroy();
			model = new Konva.Image({
				x: x * cellWidth,
				y: y * cellHeight,
				width: cellWidth,
				height: cellHeight,
				image: imageObj
			});
			model.cache();
			model.filters([Konva.Filters.RGBA]);

			super(color, model, layer);
			setImageColorAnimation(model, colorValues[color], 1).play();
			this.onLoad();

		}

		imageObj.src = `${process.env.PUBLIC_URL}/images/home.png`;

		this.hasAltColor = false;
		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.x = x;
		this.y = y;
	}


	onBackgroundColor(color) {
		const homeColor = colorIndices.WHITE;

		if (color === homeColor && !this.hasAltColor) {
			console.log("Changing home to alt color");
			let anim = setImageColorAnimation(this.model, altColorValues[this.color], this.animTime);
			this.hasAltColor = true;
			return anim.play();
		}
		else if (color !== homeColor && this.hasAltColor) {
			let anim = setImageColorAnimation(this.model, colorValues[this.color], this.animTime);
			this.hasAltColor = false;
			return anim.play();
		}
		else {
			return Promise.resolve();
		}
	}

	// destroy() {
	// 	this.model.destroy();
	// }
}

