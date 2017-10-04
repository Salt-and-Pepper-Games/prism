import isEmpty from 'lodash.isempty';
import Konva from 'konva';
/**
 * This class handles the global syncronization of all animations
 * The goal is to prevent the different board components from being out of sync
 */
export default class AnimationManager {
	AnimationManager() {
		this.board = null;
		// the frames queue
		// each element is a dictionary containing all of the state changes that need to be animated
		this.frames = [];
		this.promiseChain = null;
		this.speed = 1;
		this.queuedAnimations = 0;
		console.log(Konva.Tween.prototype);
	}

	addFrame(data) {
		// this.frames.unshift(data);
		console.log(data);
		if (isEmpty(data)) {
			return;
		}
		if (this.promiseChain && this.queuedAnimations > 0) {
			this.queuedAnimations += 1;
			console.log("Queued: " + this.queuedAnimations);
			if (this.queuedAnimations > this.speed) {
				this.speed = this.queuedAnimations;
			}
			this.promiseChain = this.promiseChain.then(() => this.animateData(data));
		}
		else {
			console.log("Resetting speed");
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
			console.log("Starting: " + this.queuedAnimations);
			return Promise.all(promises).then(() => {
				this.queuedAnimations -= 1;
				console.log("Finished: " + this.queuedAnimations);
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
