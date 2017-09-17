import Konva from 'konva';
import { blockTypes } from './board';
import { colorValues, altColorValues } from '../colors';

export default class Block {

	constructor(color, x, y, width, height, layer) {
		this.type = blockTypes.BLOCK;
		this.color = color;
		this.hasAltColor = false;
		
		this.x = x;
		this.y = y;

		this.width = .9 * layer.width() / width;
		this.height = .9 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		// TODO: fix this weird bug
		// if you take out the setTimeout stuff, the block at (0, 5) won't display
		// it'll load fine, but it won't render
		// it's the first block added to the layer so it's gotta be that something in the layer
		// is not ready
		setTimeout(() => {
		this.model = new Konva.Rect({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			offsetX: this.width / 2,
			offsetY: this.height / 2,
			width: this.width,
			height: this.height,
			cornerRadius: 10,
			fill: colorValues[color]
		});
		layer.add(this.model);
		layer.draw();
	}, 0);
	}

	onBackgroundColor(color) {
		if (color === this.color && !this.hasAltColor) {
			this.model.to({
				fill: altColorValues[this.color],
				duration: .35,
			});
			this.hasAltColor = true;
		}
		else if (color !== this.color && this.hasAltColor) {
			this.model.to({
				fill: colorValues[this.color],
				duration: .35,
			});
			this.hasAltColor = false;
		}
	}
	
	destroy() {
		this.model.destroy();
	}
}

