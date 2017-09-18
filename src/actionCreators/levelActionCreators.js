import types from './levelActionNames';

export const loadLevelAction = ({ levelString, levelNumber, packInfo }) => ({
	type: types.LOAD_LEVEL,
	levelString,
	levelNumber,
	packInfo
})

export const closeLevelAction = () => ({
	type: types.CLOSE_LEVEL
})

export const completeLevelAction = () => ({
	type: types.COMPLETE_LEVEL
})
