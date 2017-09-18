import types from './levelActionNames';

export const loadLevelAction = ({ levelString, levelNumber, packInfo }) => ({
	type: types.LOAD_LEVEL,
	levelString,
	levelNumber,
	packInfo
})

export const closeLevel = () => ({
	type: types.CLOSE_LEVEL
})

export const completeLevel = () => ({
	type: types.COMPLETE_LEVEL
})
