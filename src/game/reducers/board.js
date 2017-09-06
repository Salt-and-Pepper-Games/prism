import types from '../../actionCreators/levelActionNames.js';
import { blockTypes } from '../models/board';

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

const colorMap = {
	BLACK: 0,
	RED: 1,
	GREEN: 2,
	YELLOW: 3,
	BLUE: 4,
	MAGENTA: 5,
	CYAN: 6,
	WHITE: 7
}

// TODO: Figure out if this should be separated into four reducers, or if it's ok to have it all here

export const defaultState = {
	loaded: false,
	blocks: null,
	player: null,
	enemies: null,
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.LOAD_LEVEL:
			console.log("Loading level");
			const board = parseBoard(action.data);
			const newState = Object.assign({}, state, board); 
			Object.assign(newState, { loaded: true });
			return newState;
		default:
			return state;
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
			color = colorMap.RED;
			break;
		case charMap.GREEN_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.GREEN;
			break;
		case charMap.BLUE_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.BLUE;
			break;
		case charMap.YELLOW_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.YELLOW;
			break;
		case charMap.CYAN_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.CYAN;
			break;
		case charMap.MAGENTA_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.MAGENTA;
			break;
		case charMap.WHITE_BLOCK:
			type = blockTypes.BLOCK;
			color = colorMap.WHITE;
			break;
		case charMap.RED_SWITCH: 
			type = blockTypes.SWITCH;
			color = colorMap.RED;
			break;
		case charMap.GREEN_SWITCH: 
			type = blockTypes.SWITCH;
			color = colorMap.GREEN;
			break;
		case charMap.BLUE_SWITCH:
			type = blockTypes.SWITCH;
			color = colorMap.BLUE;
			break;
		default:
			// invalid block character
			const err = new Error('InvalidBlockChar');
			err.block = c;
			throw err;
	}
	return {
		type,
		color
	};
}



