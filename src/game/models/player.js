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

		this.width = .7 * layer.width() / width;
		this.height = .7 * layer.height() / height;

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
		// 	stroke: colorValues[colorIndices.WHITE]
		// });

		//build the eye model
		this.model = new Konva.Group({
			x: this.cellWidth * (x + .5),
			y: this.cellHeight * (y + .5),
		});

		this.body = new Konva.Rect({
			x:0, 
			y:0,
			width: this.width,
			height: this.height,
			offsetX: this.width / 2,
			offsetY: this.height / 2,
			fill: colorValues[colorIndices.WHITE],
			cornerRadius: 10,
			strokeWidth: 0,
		});

		this.eyehole = new Konva.Ellipse({
			x:0,
			y:0,
			width: this.width / 1.2,
			height: this.height / 1.8,
			fill: colorValues[colorIndices.BLACK],
			strokeWidth: 0,
		});

		this.iris = new Konva.Ellipse({
			x:0,
			y:0,
			width: this.width / 1.7,
			height: this.height / 1.7,
			fill: colorValues[colorIndices.WHITE],
			strokeWidth: 0,
		});

		this.eye = new Konva.Ellipse({
			x: 0,
			y: 0,
			offsetX: -this.width / 12,
			width: this.width / 3.2,
			height: this.height / 3.2,
			fill: colorValues[colorIndices.BLACK],
			strokeWidth: 0,
		});

		this.backgroundColorGroup = [this.eye, this.eyehole];
		this.playerColorGroup = [this.body, this.iris];

		this.model.add(this.body);
		this.model.add(this.eyehole);
		this.model.add(this.iris);
		this.model.add(this.eye);

		layer.add(this.model);

		const playerAnim = new Konva.Animation(this.updatePlayer.bind(this), layer);
		playerAnim.start();
	}

	// Returns a boolean indicating is position actually changed.
	moveTo(x, y) {
		this.targetX = x;
		this.targetY = y;
		// this.x = x;
		// this.y = y;
		// let tween = new Konva.Tween({
		// 	node: this.model,
		// 	x: this.cellWidth * (x + .5),
		// 	y: this.cellHeight * (y + .5),
		// 	duration: .2,
		// 	easing: Konva.Easings.StrongEaseOut
		// });
		// tween.play();

	}

	updatePlayer(frame) {
		const { timeDiff } = frame;
		if (this.closeToTarget()) {
			this.dx = 0;
			this.dy = 0;
			this.model.setScaleX(1);
			this.model.setScaleY(1);
			return;
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


		//eye animation
		let directionToCenter = Math.atan2(-this.y, -this.x);
		this.eye.setRotation(directionToCenter / Math.PI * 180.0);

		const hStretch = 1 / (2 * (Math.abs(this.dy) - Math.abs(this.dx)) + 1);
		const vStretch = 1 / (2 * (Math.abs(this.dx) - Math.abs(this.dy)) + 1);
		this.model.setScaleX(hStretch);
		this.model.setScaleY(vStretch);
		// console.log(this.x, this.y);
	}

	closeToTarget() {
		const tolerance = .01;
		return Math.abs(this.x - this.targetX) < tolerance && Math.abs(this.y - this.targetY) < tolerance;
	}

	onBackgroundColor(color) {
		const playerColor = colorIndices.WHITE;

		//Tween the color of the background colored components
		this.backgroundColorGroup.forEach((modelComponent) => {
			let tween = new Konva.Tween({
				node: modelComponent,
				fill: colorValues[color],
				duration: .35,
			});
			tween.play();
		});

		if (color === playerColor && !this.hasAltColor) {
			this.playerColorGroup.forEach((modelComponent) => {
				let tween = new Konva.Tween({
					node: modelComponent,
					fill: altColorValues[this.color],
					duration: .35,
				});
				tween.play();
			});
			this.hasAltColor = true;
		}
		else if (color !== playerColor && this.hasAltColor) {
			this.playerColorGroup.forEach((modelComponent) => {
				let tween = new Konva.Tween({
					node: modelComponent,
					fill: colorValues[this.color],
					duration: .35,
				});
				tween.play();
			});
			this.hasAltColor = false;
		}
	}
}

