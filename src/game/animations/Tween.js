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

	constructor({node, to, duration, onStart, layer, animationFunction}) {
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
					if (prop === "fill") {
						let r = Math.floor((t * this.to[prop].r + (1 - t) * this.from[prop].r));
						let g = Math.floor((t * this.to[prop].g + (1 - t) * this.from[prop].g));
						let b = Math.floor((t * this.to[prop].b + (1 - t) * this.from[prop].b));
						let a = Math.floor((t * this.to[prop].a + (1 - t) * this.from[prop].a));
						let newColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
						this.node[prop](newColor);
					}
					else {
						let newVal = t * this.to[prop] + (1 - t) * this.from[prop];
						// console.log("Setting " + prop + " to " + newVal);
						this.node[prop](newVal);
					}
				}
			};
		}
		this.duration = duration;
		this.layer = layer || node.getLayer();
		this.speed = 1;
		this.progress = 0;
		if (onStart) {
			this.onStart = onStart;
		}
		else {
			this.onStart = () => {};
		}
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
		this.onStart();
		this.startTime = new Date().getTime();
		this.id = Tween.nextId;
		this.from = {};
		for (let property in this.to) {
			this.from[property] = this.node[property]();
		}
		if (this.to && "fill" in this.to) {
			[this.to, this.from].forEach(state => {
				let rgba = Konva.Util.colorToRGBA(state.fill);
				state.fill = {
					r: rgba.r,
					g: rgba.g,
					b: rgba.b,
					a: rgba.a
				}
			});
		}

		Tween.tweens[this.id] = this;
		if (this.layer._id in Tween.layerCounts) {
			Tween.layerCounts[this.layer._id] += 1;
		}
		else {
			Tween.layerCounts[this.layer._id] = 1;
		}
		if (Tween.layerCounts[this.layer._id] === 1) {
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
		if (Object.keys(Tween.tweens).length === 0) {
			Tween.animation.stop();
		}
		Tween.layerCounts[this.layer._id] -= 1;
		if (Tween.layerCounts[this.layer._id] <= 0) {
			delete Tween.layerCounts[this.layer._id];
			let index = Tween.layers.indexOf(this.layer);
			if (index > -1) {
				Tween.layers = Tween.layers.filter((l,i) => i !== index);
				Tween.animation.setLayers(Tween.layers);
			}
		}
	}
}
