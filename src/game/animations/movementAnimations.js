import Konva from 'konva';

export const moveToAnimation = (node, x, y, duration) => {
	return {
		play: () => {
			return new Promise(resolve => {
				let tween = new Konva.Tween({
					node: node,
					x: x,
					y: y,
					duration: 1,
					easing: Konva.Easings.EaseOut,
					onFinish: function() {
						this.destroy();
						resolve();
					}
				});
				tween.tween.duration = duration;
				tween.play();
			});
		}
	}
}
