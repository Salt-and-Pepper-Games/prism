import types from './levelActionNames';

export default {
	loadLevelAction: ({ levelString, levelNumber, packInfo }) => ({
		type: types.LOAD_LEVEL,
		levelString,
		levelNumber,
		packInfo
	}),
	closeLevel: () => ({
		type: types.CLOSE_LEVEL
	})
}
