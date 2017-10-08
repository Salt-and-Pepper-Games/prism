import Konva from 'konva';

export default class Tween {
	static tweens = {};
	static layerCounts = {};
	static layers = [];
	static nextId = 0;
	static animation = new Konva.Animation(({timeDiff, lastTime, time, frameRate}) => {
		// run all tweens here
		// console.log("Frame");
		// console.log(Tween.layers);
		// console.log(Tween.animation.getLayers().slice(0));
		for (let key in Tween.tweens) {
			if (Tween.tweens.hasOwnProperty(key)) {
				let tween = Tween.tweens[key];
				tween.elapsedTime += timeDiff;
				let finish = false;
				if (tween.elapsedTime >= tween.duration) {
					console.log("Finished");
					finish = true;
				}
				let t = finish ? 1 : tween.easing(tween.elapsedTime / tween.duration);
				console.log(t);
				for (let prop in tween.to) {
					tween.node[prop](t * tween.to[prop] + (1 - t) * tween.from[prop]);
				}
				if (finish) {
					tween.onFinish();
				}
			}
		}
	});

	constructor(node, to, duration, layer) {
		this.node = node;
		this.to = to;
		this.duration = duration;
		this.baseDuration = duration;
		this.layer = layer;
		this.easing = t => t;
		this.elapsedTime = 0;
	}

	static setCurrentTweenSpeed(n) {
		for (let key in Tween.tweens) {
			let tween = Tween.tweens[key];
			tween.setSpeedMultiplier(n);
		}
	}

	setSpeedMultiplier(n) {
		console.log("Setting current speed to " + n);
		let currTime = new Date().getTime();
		if (this.startTime) {
			let remaining = (this.startTime + this.baseDuration - currTime);
			this.duration = this.baseDuration - ((n-1)/n * remaining);
		}
		else {
			this.duration = this.baseDuration / n;
		}
	}

	play() {
		this.startTime = new Date().getTime();
		this.id = Tween.nextId;
		this.from = {};
		for (let property in this.to) {
			this.from[property] = this.node[property]();
		}
		Tween.tweens[this.id] = this;
		if (this.layer in Tween.layerCounts) {
			Tween.layerCounts[this.layer] += 1;
		}
		else {
			Tween.layerCounts[this.layer] = 1;
		}
		if (Tween.layerCounts[this.layer] == 1) {
			Tween.layers.push(this.layer);
			Tween.animation.setLayers(Tween.layers);
		}
		Tween.nextId += 1;
		if (!Tween.animation.isRunning()) {
			Tween.animation.start();
		}
		return new Promise(resolve => {
			this.onFinish = function() {
				this.destroy();
				resolve();
			}
		});
	}

	destroy() {
		delete Tween.tweens[this.id];
		if (Object.keys(Tween.tweens).length == 0) {
			Tween.animation.stop();
		}
		Tween.layerCounts[this.layer] -= 1;
		if (Tween.layerCounts[this.layer] <= 0) {
			delete Tween.layerCounts[this.layer];
			let index = Tween.layers.indexOf(this.layer);
			if (index > -1) {
				Tween.layers = Tween.layers.filter((l,i) => i !== index);
				Tween.animation.setLayers(Tween.layers);
			}
		}
	}
}
