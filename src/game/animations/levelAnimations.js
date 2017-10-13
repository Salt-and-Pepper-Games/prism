import Tween from './Tween';

export const destroyAnimation = (node, offsetX, offsetY, duration) => {
	return new Tween({
		node,
		duration,
		to: {
			// opacity: 0
			width: 0,
			height: 0,
			offsetX,
			offsetY
		}
	})
}

export const loadAnimation = (node, width, height, offsetX, offsetY, duration) => {
	return new Tween({
		node,
		duration,
		to: {
			// opacity: 1
			width,
			height,
			offsetX,
			offsetY
		}
	});
}
// export const levelEndAnimation = (board, volume, duration, layer) => {
// 	return new Tween({
// 		onStart: () => {
// 			// play audio here
// 		},
// 		animationFunction: t => {
// 			// animate out that board
// 		},
// 		layer,
// 		duration
// 	});
// }

// export const levelStartAnimation = (board, volume, duration, layer) => {
// 	return new Tween({
// 		onStart: () => {
// 			// play audio here
// 		},
// 		animationFunction: t => {
// 			// animate in that board
// 		},
// 		layer,
// 		duration
// 	});
// }

