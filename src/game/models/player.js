import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';
import MutableNumber from '../../utils/MutableNumber';

export default class Player {
	constructor(x, y, width, height, layer) {
		this.color = colorIndices.PLAYER;
		this.hasAltColor = false;

		this.baseAnimTime = .35;
		this.animTime = new MutableNumber(this.baseAnimTime);

		this.movementAnimLength = .7;
		this.movementAnimTime = new MutableNumber(this.baseAnimTime * this.movementAnimLength);

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

		// const playerAnim = new Konva.Animation(this.updatePlayer.bind(this), layer);
		// playerAnim.start();
	}

	// Returns a promise that resolves when the animation is complete
	moveTo(x, y) {
		const oldTargetX = this.targetX;
		const oldTargetY = this.targetY;
		this.targetX = x;
		this.targetY = y;

		// this.x = x;
		// this.y = y;
		// return new Promise(resolve => {
		// 	this.model.to({
		// 		x: this.cellWidth * (x + .5),
		// 		y: this.cellHeight * (y + .5),
		// 		duration: this.movementAnimTime,
		// 		// easing: moveToAnimation(oldTargetX, oldTargetY, x, y, x == oldTargetX),
		// 		easing: Konva.Easings.EaseOut,
		// 		onFinish: resolve
		// 	});
		// })
	}

	setAnimationMultiplier(n) {
		this.animTime.set(this.baseAnimTime / n);
		this.movementAnimTime.set(this.baseAnimTime * this.movementAnimLength / n);
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
		return (time, begin, change, duration) => {
			time = time / duration;
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

			//eye animation
			// TODO make eye look at exit when it exists (for now we just look at top left corner)
		const directionToCenter = Math.atan2(-this.y, -this.x);
		this.eye.setRotation(directionToCenter / Math.PI * 180.0);
	}

	closeToTarget() {
		const tolerance = .01;
		return Math.abs(this.x - this.targetX) < tolerance && Math.abs(this.y - this.targetY) < tolerance;
	}

	onBackgroundColor(color) {
		const playerColor = colorIndices.WHITE;

		const anims = [];
		//Tween the color of the background colored components
		anims.push(new Promise(resolve => {
			this.backgroundColorGroup.forEach((modelComponent) => {
				this.model.to({
					fill: colorValues[color],
					duration: this.animTime,
					onFinish: resolve
				});
			});
		}));

		if (color === playerColor && !this.hasAltColor) {
			anims.push(new Promise(resolve => {
				this.playerColorGroup.forEach((modelComponent) => {
					modelComponent.to({
						fill: altColorValues[this.color],
						duration: this.animTime,
						onFinish: resolve
					});
				});
			}));
			this.hasAltColor = true;
		}
		else if (color !== playerColor && this.hasAltColor) {
			anims.push(new Promise(resolve => {
				this.playerColorGroup.forEach((modelComponent) => {
					modelComponent.to({
						fill: colorValues[this.color],
						duration: this.animTime,
						onFinish: resolve
					});
				});
			}));
			this.hasAltColor = false;
		}
		return Promise.all(anims);
	}

	destroy() {
		this.model.destroy();
	}
}

