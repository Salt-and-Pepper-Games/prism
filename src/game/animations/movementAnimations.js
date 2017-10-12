import Tween from './Tween';

export const moveToAnimation = (node, x, y, duration) => {
	let from = {
		x: node.x(),
		y: node.y(),
		width: node.width(),
		height: node.height()
	};
	let vertical = from.y === y;
	return new Tween({
		node, 
		to: {
			x,
			y
		}, 
		duration, 
		animationFunction: (t) => {
			const xDiff = x - from.x;
			const yDiff = y - from.y;
			node.x(from.x + xDiff * t);
			node.y(from.y + yDiff * t);
			let scaleFactor = Math.cos(t * 2 * Math.PI) * .13 + .82;
			if (vertical) {
				node.scaleY(scaleFactor);
			} else {
				node.scaleX(scaleFactor);
			}
		}
	});
}
