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
				node.setScaleY(scaleFactor);
			} else {
				node.setScaleX(scaleFactor);
			}
		}
	});
}

export const squishAnimation = function(node, x, y, dx, dy, widthPercentage, heightPercentage, cellWidth, cellHeight, duration) {
		let targetSquish = 0.3;
		let squishX, squishY, targetX, targetY;
		let width = widthPercentage;
		let height = heightPercentage;
		if (dx) {
			// horizontal squish
			squishX = t => -Math.sin(Math.PI * t) * targetSquish + 1;
			squishY = t => Math.sin(Math.PI * t) * targetSquish + 1;
			// targetX = x + dx * width * cellWidth * (1 - targetSquish) / 2;
			targetX = x + dx * (cellWidth * ((1 - width) / 1.7 + (width * targetSquish / 2)));
			targetY = y;
		}
		else if (dy) {
			// vertical squish
			squishX = t => Math.sin(Math.PI * t) * targetSquish + 1;
			squishY = t => -Math.sin(Math.PI * t) * targetSquish + 1;
			targetX = x;
			targetY = y + dy * (cellHeight * ((1 - height) / 1.7 + (height * targetSquish / 2)));
		}
		let diffX = targetX - x;
		let diffY = targetY - y;
		return new Tween({
			node,
			duration,
			animationFunction: t => {
				let sinT = Math.sin(Math.PI * t);
				node.x((cellWidth * (x + .5)) + diffX * sinT);
				node.y((cellHeight * (y + .5)) + diffY * sinT);
				node.scaleX(squishX(t));
				node.scaleY(squishY(t));
			}
		});
}
