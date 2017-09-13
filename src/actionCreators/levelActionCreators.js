import types from './levelActionNames';

// export const loadLevel = (pack, number) => {
// 	return dispatch => fetch('levels/' + pack + '/' + number + '.txt')
// 		.then(res => res.text())
// 		.then(text => {
// 			dispatch(loadLevelAction(text, pack, number));
// 			return text;
// 		});
// }

export const loadLevelAction = ({ levelString, levelNumber, packInfo }) => ({
	type: types.LOAD_LEVEL,
	levelString,
	levelNumber,
	packInfo
});
