import Konva from 'konva';
import { altColorValues, colorIndices, colorValues } from '../colors';
import MutableNumber from '../../utils/MutableNumber';
import { squishAnimation, moveToAnimation } from '../animations/movementAnimations';
import { setColorAnimation } from '../animations/colorAnimations';
import BaseModel from './baseModel';

export default class Player extends BaseModel {
	constructor(x, y, width, height, layer) {
		let color = colorIndices.PLAYER;
		let cellWidth = layer.width() / width;
		let cellHeight = layer.height() / height;
		width = .7 * layer.width() / width;
		height = .7 * layer.height() / height;

		let model = new Konva.Group({
			x: cellWidth * (x + .5),
			y: cellHeight * (y + .5),
		});

		let body = new Konva.Rect({
			x:0, 
			y:0,
			width: width,
			height: height,
			offsetX: width / 2,
			offsetY: height / 2,
			fill: colorValues[colorIndices.WHITE],
			cornerRadius: 10,
			strokeWidth: 0,
		});

		let eyehole = new Konva.Ellipse({
			x:0,
			y:0,
			width: width / 1.2,
			height: height / 1.8,
			fill: colorValues[colorIndices.BLACK],
			strokeWidth: 0,
		});

		let iris = new Konva.Ellipse({
			x:0,
			y:0,
			width: width / 1.7,
			height: height / 1.7,
			fill: colorValues[colorIndices.WHITE],
			strokeWidth: 0,
		});

		let eye = new Konva.Ellipse({
			x: 0,
			y: 0,
			offsetX: -width / 12,
			width: width / 3.2,
			height: height / 3.2,
			fill: colorValues[colorIndices.BLACK],
			strokeWidth: 0,
		});
		model.add(body);
		model.add(eyehole);
		model.add(iris);
		model.add(eye);
		super(color, model, layer);

		this.body = body;
		this.eyehole = eyehole;
		this.iris = iris;
		this.eye = eye;

		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.hasAltColor = false;

		this.movementAnimLength = 1;
		this.movementAnimTime = new MutableNumber(this.animTime * this.movementAnimLength);

		this.colorAnimLength = 1;
		this.colorAnimTime = new MutableNumber(this.animTime * this.colorAnimLength);

		this.x = x;
		this.y = y;

		this.targetX = x;
		this.targetY = y;

		this.dx = 0;
		this.dy = 0; // for animating


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

		this.backgroundColorGroup = [this.eye, this.eyehole];
		this.playerColorGroup = [this.body, this.iris];

		// const playerAnim = new Konva.Animation(this.updatePlayer.bind(this), layer);
		// playerAnim.start();
	}

	// Returns a promise that resolves when the animation is complete
	moveTo(x, y) {
		this.x = x;
		this.y = y;
		let anim = moveToAnimation(this.model, this.cellWidth * (x + .5), this.cellHeight * (y + .5), this.movementAnimTime);
		return anim.play();
	}

	/**
	 * Squish animation for attempting to move the direction specified by (dx, dy)
	 * @param {Number} dx - should be 1, 0, or -1
	 * @param {Number} dy - should be 1, 0, or -1
	 */
	onSquish(dx, dy) {
		let anim = squishAnimation(this.model, this.x, this.y, dx, dy, this.width / this.cellWidth, this.height / this.cellHeight, this.cellWidth, this.cellHeight, this.animTime);
		return anim.play();
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

	updatePlayer(frame) {
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
		this.backgroundColorGroup.forEach((modelComponent) => {
			let anim = setColorAnimation(modelComponent, colorValues[color], this.animTime);
			anims.push(anim.play());
		});

		if (color === playerColor && !this.hasAltColor) {
			this.playerColorGroup.forEach(modelComponent => {
				let anim = setColorAnimation(modelComponent, altColorValues[color], this.animTime);
				anims.push(anim.play());
			});
			this.hasAltColor = true;
		}
		else if (color !== playerColor && this.hasAltColor) {
			this.playerColorGroup.forEach((modelComponent) => {
				let anim = setColorAnimation(modelComponent, colorValues[this.color], this.animTime);
				anims.push(anim.play());
			});
			this.hasAltColor = false;
		}
		return Promise.all(anims);
	}

	// destroy() {
	// 	this.model.destroy();
	// }
}

