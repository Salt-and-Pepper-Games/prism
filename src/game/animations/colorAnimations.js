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

export const setImageColorAnimation = (node, color, duration) => {
	console.log(node);
	let { r, g, b, a} = Konva.Util.colorToRGBA(color);
	console.log(r,g,b,a);
	return new Tween({
		node,
		to: {
			red: r,
			green: g,
			blue: b,
			alpha: a
		},
		duration
	});
}
