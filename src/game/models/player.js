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

		//takes animation objects of type animation type, duration, enum
		this.animationSpeed = 1;
		this.animationQueue = [];

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
		const oldTargetX = this.targetX;
		const oldTargetY = this.targetY;
		this.targetX = x;
		this.targetY = y;
		this.pushAnimation(1000, this.moveToAnimation(oldTargetX, oldTargetY, this.targetX, this.targetY, this.targetY === oldTargetY));

		const totalDuration = this.animationQueue.reduce(function(sum, value) {
  			return sum + value.timeLeft;
		}, 0);

		this.animationSpeed = Math.min(totalDuration / 200.0, 100);

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

	pushAnimation(duration, animation) {
		this.animationQueue.push({
			duration:duration,
			timeLeft:duration,
			animation:animation,
		});
	}

	/*squishAnimation(x, y, deltaX, deltaY, vertical) {
		return (time) => {
			const xDiff = targetX - x;
			const yDiff = targetY - y;
			const animationPos = Math.sin(time * Math.PI / 2.0);
			this.x = x + xDiff * animationPos;
			this.y = y + yDiff * animationPos;
			this.model.setX(this.cellWidth * (this.x + .5));
			this.model.setY(this.cellHeight * (this.y + .5));
			if (vertical) {
				this.model.setScaleY(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
				this.model.setScaleX(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
			} else {
				this.model.setScaleX(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
				this.model.setScaleY(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
			}
		};
	}*/

	moveToAnimation(x, y, targetX, targetY, vertical) {
		return (time) => {
			const xDiff = targetX - x;
			const yDiff = targetY - y;
			const animationPos = Math.sin(time * Math.PI / 2.0);
			this.x = x + xDiff * animationPos;
			this.y = y + yDiff * animationPos;
			this.model.setX(this.cellWidth * (this.x + .5));
			this.model.setY(this.cellHeight * (this.y + .5));
			if (vertical) {
				this.model.setScaleY(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
			} else {
				this.model.setScaleX(Math.cos(time * 2 * Math.PI) * 0.09 + 0.91);
			}
		};
	}

	updatePlayer(frame) {
		const { timeDiff } = frame;

		if (this.animationQueue.length > 0) {
			const currentAnimation = this.animationQueue[0];
			currentAnimation.timeLeft -= this.animationSpeed * timeDiff;
			currentAnimation.timeLeft = Math.max(currentAnimation.timeLeft, 0);
			currentAnimation.animation(1 - currentAnimation.timeLeft / currentAnimation.duration);
			if (currentAnimation.timeLeft === 0) {
				this.animationQueue.shift();
			}

			//eye animation
			// TODO make eye look at exit when it exists (for now we just look at top left corner)
			const directionToCenter = Math.atan2(-this.y, -this.x);
			this.eye.setRotation(directionToCenter / Math.PI * 180.0);
		}
		else {
			return false;
		}
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

	destroy() {
		this.model.destroy();
	}
}

