import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';

export default class Player {
	constructor(x, y, width, height, layer) {
		this.color = colorIndices.PLAYER;
		this.hasAltColor = false;

		this.x = x;
		this.y = y;

		this.targetX = x;
		this.targetY = y;

		this.dx = 0;
		this.dy = 0; // for animating

		this.width = .5 * layer.width() / width;
		this.height = .5 * layer.height() / height;

		this.cellWidth = layer.width() / width;
		this.cellHeight = layer.height() / height;

		// this.model = new Konva.Rect({
		// 	x: this.cellWidth * (x + .5),
		// 	y: this.cellHeight * (y + .5),
		// 	offsetX: this.width / 2,
		// 	offsetY: this.height / 2,
		// 	width: this.width,
		// 	height: this.height,
		// 	cornerRadius: 10,
		// 	fill: colorValues[colorIndices.WHITE]
		// });

		this.model =  new Konva.Circle({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			radius: this.width / 2,
			fill: colorValues[this.color]
		});

		layer.add(this.model);

		// const playerAnim = new Konva.Animation(this.updatePlayer.bind(this), layer);
		// playerAnim.start();
	}

	// Returns a boolean indicating is position actually changed.
	moveTo(x, y) {
		this.targetX = x;
		this.targetY = y;
		// this.x = x;
		// this.y = y;
		let tween = new Konva.Tween({
			node: this.model,
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
			duration: .2,
			easing: Konva.Easings.StrongEaseOut
		});
		tween.play();

	}

	updatePlayer(frame) {
		const { timeDiff } = frame;
		if (this.closeToTarget()) {
			this.dx = 0;
			this.dy = 0;
			return false;
		}

		// simulating spring force to targetX, targetY
		let aX = this.targetX - this.x;
		let aY = this.targetY - this.y;
		this.dx += aX * .2;
		this.dy += aY * .2;
		this.dx *= .6;
		this.dy *= .6;
		this.x += this.dx;
		this.y += this.dy;
		this.model.setX(this.cellWidth * (this.x + .5));
		this.model.setY(this.cellHeight * (this.y + .5));
		// console.log(this.x, this.y);
	}

	closeToTarget() {
		const tolerance = .05;
		return Math.abs(this.x - this.targetX) < tolerance && Math.abs(this.y - this.targetY) < tolerance;
	}

	onBackgroundColor(color) {
		const playerColor = colorIndices.WHITE;
		if (color === playerColor && !this.hasAltColor) {
			let tween = new Konva.Tween({
				node: this.model,
				fill: altColorValues[this.color],
				duration: .35,
			});
			tween.play();
			this.hasAltColor = true;
		}
		else if (color !== playerColor && this.hasAltColor) {
			let tween = new Konva.Tween({
				node: this.model,
				fill: colorValues[this.color],
				duration: .35,
			});
			tween.play();
			this.hasAltColor = false;
		}
	}
}

