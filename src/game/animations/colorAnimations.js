import Konva from 'konva';
import Tween from './Tween';

export const setColorAnimation = (node, color, duration) => new Tween({
	node,
	to: {
		fill: color
	},
	duration,
	layer: node.layer
});

// export const setColorAnimation = (node, color, duration) => ({
// 	play: () => {
// 		return new Promise(resolve => {
// 			let tween = new Konva.Tween({
// 				node: node,
// 				fill: color,
// 				onFinish: function() {
// 					this.destroy();
// 					resolve();
// 				}
// 			});
// 			tween.tween.duration = duration;
// 			tween.play();
// 		});
// 	}
// });
