import types from './playerActionNames';

export const moveUp = () => ({
	type: types.MOVE_UP
});

export const moveDown = () => ({
	type: types.MOVE_DOWN
});

export const moveLeft = () => ({
	type: types.MOVE_LEFT
});

export const moveRight = () => ({
	type: types.MOVE_RIGHT
});

export const undo = () => ({
	type: types.UNDO
});
