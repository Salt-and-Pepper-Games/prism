import backgroundActions from '../../actionCreators/backgroundActionNames';
import levelActions from '../../actionCreators/levelActionNames';
import playerActions from '../../actionCreators/playerActionNames';
import { blockTypes } from '../models/board';
import { colorIndices } from '../colors';

const charMap = {
	EMPTY: 'e',
	RED_BLOCK: 'r',
	GREEN_BLOCK: 'g',
	BLUE_BLOCK: 'b',
	YELLOW_BLOCK: 'y',
	CYAN_BLOCK: 'c',
	MAGENTA_BLOCK: 'm',
	WHITE_BLOCK: 'w',
	RED_SWITCH: 'R',
	GREEN_SWITCH: 'G',
	BLUE_SWITCH: 'B'
}

// TODO: Figure out if this should be separated into four reducers, or if it's ok to have it all here

export const defaultState = {
	loaded: false,
	blocks: null,
	player: null,
	enemies: null,
	background: colorIndices.BLACK
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case levelActions.LOAD_LEVEL:
			const board = parseBoard(action.data);
			const newState = Object.assign({}, state, board); 
			Object.assign(newState, { loaded: true });
			return newState;
		case playerActions.MOVE_UP:
			return getStateFromMovement(state, state.player.x, state.player.y - 1);
		case playerActions.MOVE_DOWN:
			return getStateFromMovement(state, state.player.x, state.player.y + 1);
		case playerActions.MOVE_LEFT:
			return getStateFromMovement(state, state.player.x - 1, state.player.y);
		case playerActions.MOVE_RIGHT:
			return getStateFromMovement(state, state.player.x + 1, state.player.y);
		case backgroundActions.SET_COLOR:
			return getStateFromBgColor(state, action.color);
		default:
			return state;
	}
}

function getStateFromMovement(oldBoard, x, y) {
	if (oldBoard.blocks[x] && oldBoard.blocks[x][y] &&
			(oldBoard.blocks[x][y].type !== blockTypes.BLOCK || 
			oldBoard.blocks[x][y].color === oldBoard.background)) {
		return Object.assign({}, oldBoard, {
			player: { x, y }
		});
	}
	else {
		return oldBoard;
	}
}

function getStateFromBgColor(oldBoard, color) {
	if (color !== oldBoard.bgColor) {
		const newBlocks = Object.assign({}, oldBoard.blocks);
		for (let i=0; i<newBlocks.length; i++) {
			for (let j=0; j<newBlocks[i].length; j++) {
				newBlocks[i][j].passable = newBlocks[i][j].type === blockTypes.EMPTY ||
					newBlocks[i][j] === color;
			}
		}
		const newSwitches = Object.assign({}, oldBoard.switches);
		for (let i=0; i<newSwitches.length; i++) {
			newSwitches[i].toggled = newSwitches[i].color & color;
		}
		return Object.assign({}, oldBoard, {
			blocks: newBlocks,
			switches: newSwitches,
			background: color
		});
	}
	else {
		return oldBoard;
	}
}

/**
 * sample level file format:
 * =========================
 * startX startY
 * endX endY
 * rows columns
 * b b b b b b b
 * b b b b b b b
 * etc.
 * =========================
 */
const parseBoard = lines => {
	const data = lines.split(/\r?\n/);
	for (let i=0; i<data.length; i++) {
		data[i] = data[i].split(' ')
	}

	try {
		const player = {
			x: parseInt(data[0][0]),
			y: parseInt(data[0][1])
		}

		const home = {
			x: parseInt(data[1][0]),
			y: parseInt(data[1][1])
		}

		const size = {
			width: parseInt(data[2][0]),
			height: parseInt(data[2][1])
		}

		const blocks = [];
		const rowOffset = 3;
		for (let i=0; i<size.width; i++) {
			blocks.push([]);
			for (let j=0; j<size.height; j++) {
				blocks[i].push(parseBoardChar(data[i + rowOffset][j]));
			}
		}
		return {
			blocks,
			player,
			home,
			enemies: null
		};
	}
	catch (e) {
		console.log("Invalid board data");
		console.log(e);
		return null;
	}
}

/**
 * @typedef {Object} Block
 * @property {String} type - The type of block - SWITCH, BLOCK, or EMPTY
 * @property {Number} color - The color of the block, as a number between 1 and 7, or null if empty
 */

/**
 * Parse a single character and turn it into an object with basic info about the block it represents
 * @function
 * @param {Character} c - the char to parse
 * @return {Block} the block data
 */
const parseBoardChar = c => {
	let type = null;
	let color = null;
	switch (c) {
		case charMap.EMPTY:
			type = blockTypes.EMPTY;
			break;
		case charMap.RED_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.RED;
			break;
		case charMap.GREEN_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.GREEN;
			break;
		case charMap.BLUE_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.BLUE;
			break;
		case charMap.YELLOW_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.YELLOW;
			break;
		case charMap.CYAN_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.CYAN;
			break;
		case charMap.MAGENTA_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.MAGENTA;
			break;
		case charMap.WHITE_BLOCK:
			type = blockTypes.BLOCK;
			color = colorIndices.WHITE;
			break;
		case charMap.RED_SWITCH: 
			type = blockTypes.SWITCH;
			color = colorIndices.RED;
			break;
		case charMap.GREEN_SWITCH: 
			type = blockTypes.SWITCH;
			color = colorIndices.GREEN;
			break;
		case charMap.BLUE_SWITCH:
			type = blockTypes.SWITCH;
			color = colorIndices.BLUE;
			break;
		default:
			// invalid block character
			const err = new Error('InvalidBlockChar');
			err.block = c;
			throw err;
	}
	return {
		type,
		color,
		passable: false
	};
}



