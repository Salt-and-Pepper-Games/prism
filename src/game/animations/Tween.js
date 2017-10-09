import Konva from 'konva';

export default class Tween {
	static tweens = {};
	static layerCounts = {};
	static layers = [];
	static nextId = 0;
	static animation = new Konva.Animation(({timeDiff, lastTime, time, frameRate}) => {
		// run all tweens here
		for (let key in Tween.tweens) {
			if (Tween.tweens.hasOwnProperty(key)) {
				let tween = Tween.tweens[key];
				tween.progress += tween.speed * timeDiff / tween.duration;
				let finish = false;
				if (tween.progress >= 1) {
					finish = true;
					tween.progress = 1;
				}
				tween.animationFunction(tween.progress);
				if (finish) {
					tween.onFinish();
				}
			}
		}
	});

	constructor({node, to, duration, layer, animationFunction}) {
		if (animationFunction) {
			this.animationFunction = animationFunction;
		}
		else {
			this.node = node;
			this.to = to;
			this.easing = t => t;
			this.animationFunction = function(t) {
				t = this.easing(t);
				for (let prop in this.to) {
					this.node[prop](t * this.to[prop] + (1 - t) * this.from[prop]);
				}
			};
		}
		this.duration = duration;
		this.layer = layer;
		this.speed = 1;
		this.progress = 0;
	}

	static setCurrentTweenSpeed(n) {
		for (let key in Tween.tweens) {
			let tween = Tween.tweens[key];
			tween.setSpeedMultiplier(n);
		}
	}

	setSpeedMultiplier(n) {
		this.speed = n;
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
