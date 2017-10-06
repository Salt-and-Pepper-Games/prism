import Konva from 'konva';

export const switchOnAnimation = (node, duration) => ({
	play: () => new Promise(resolve => {
		let tween = new Konva.Tween({
			node: node,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			offsetX: 0,
			offsetY: 0,
			easing: Konva.Easings.EaseIn,
			onFinish: function() {
				this.destroy();
				resolve();
			}
		});
		tween.tween.duration = duration;
		tween.play();
	})
});

export const switchOffAnimation = (node, shadowOffsetRatio, duration) => ({
	play: () => new Promise(resolve => {
		let tween = new Konva.Tween({
			node: node,
			shadowBlur: 0,
			shadowOffsetX: node.width() * shadowOffsetRatio,
			shadowOffsetY: node.height() * shadowOffsetRatio,
			offsetX: node.width() * shadowOffsetRatio,
			offsetY: node.height() * shadowOffsetRatio,
			easing: Konva.Easings.EaseIn,
			onFinish: function() {
				this.destroy();
				resolve();
			}
		});
		tween.tween.duration = duration;
		tween.play();
	})
});
