import Tween from './Tween';

export const switchOnAnimation = (node, duration) => new Tween({
	node,
	to: {
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		offsetX: 0,
		offsetY: 0
	},
	duration
});

export const switchOffAnimation = (node, shadowOffsetRatio, duration) => new Tween({
	node,
	to: {
		shadowBlur: 0,
		shadowOffsetX: node.width() * shadowOffsetRatio,
		shadowOffsetY: node.height() * shadowOffsetRatio,
		offsetX: node.width() * shadowOffsetRatio,
		offsetY: node.height() * shadowOffsetRatio
	},
	duration,
});


