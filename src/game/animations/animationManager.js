import Tween from './Tween';
import isEmpty from 'lodash.isempty';
import Konva from 'konva';
/**
 * This class handles the global syncronization of all animations
 * The goal is to prevent the different board components from being out of sync
 */
export default class AnimationManager {
	AnimationManager() {
		this.board = null;
		this.promiseChain = null;
		this.speed = 1;
		this.queuedAnimations = 0;
		// console.log(Konva.Tween.prototype);
	}

	addFrame(data) {
		if (isEmpty(data)) {
			return;
		}
		if (this.promiseChain && this.queuedAnimations > 0) {
			this.queuedAnimations += 1;
			if (this.queuedAnimations > this.speed) {
				this.speed = this.queuedAnimations;
				Tween.setCurrentTweenSpeed(this.speed);
			}
			this.promiseChain = this.promiseChain.then(() => this.animateData(data));
		}
		else {
			this.speed = 1;
			this.queuedAnimations = 1;
			this.promiseChain = this.animateData(data);
		}
		this.board.setAnimationMultiplier(this.speed);
	}

	animateData(data) {
		const { player, background } = data;
		const promises = [];
		if (player) {
			promises.push(this.board.setPlayerPosition(player.x, player.y));
		}
		if (typeof background !== 'undefined') {
			promises.push(this.board.setBackgroundColor(background));
		}

		if (promises.length > 0) {
			return Promise.all(promises).then(() => {
				this.queuedAnimations -= 1;
				this.speed = this.queuedAnimations;
				this.board.setAnimationMultiplier(this.speed);
				Tween.setCurrentTweenSpeed(this.speed);
			});
			// return Promise.all(promises);
		}
		else {
			// not sure how this will work out
			// shouldn't ever really happen ideally
			console.log("NULLLLLLL");
			return null;
		}
	}

	setBoard(board) {
		this.board = board;
	}
}
