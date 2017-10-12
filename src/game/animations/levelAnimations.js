import Tween from './Tween';

export const levelEndAnimation = (board, volume, duration, layer) => {
	return new Tween({
		onStart: () => {
			// play audio here
		},
		animationFunction: t => {
			// animate out that board
		},
		layer,
		duration
	});
}

export const levelStartAnimation = (board, volume, duration, layer) => {
	return new Tween({
		onStart: () => {
			// play audio here
		},
		animationFunction: t => {
			// animate in that board
		},
		layer,
		duration
	});
}

