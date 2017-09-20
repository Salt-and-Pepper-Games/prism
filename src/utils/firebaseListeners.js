import firebase from 'firebase';
import { updateLevelCompletionData } from '../actionCreators/userActionCreators';

export const saveData = (state, dispatch) => {
	// upload stuff to firebase
	const levelNumber = state.game.board.levelNumber;
	const packName = state.game.board.packInfo.packName;
	const uid = state.game.user.id;
	const solved = state.game.board.stats.solved;
	const ref = firebase.database().ref(`users/${uid}/levelData/${packName}/${levelNumber}`);
	ref.transaction(curr => {
		const data = Object.assign({}, curr || {}, {
			solved: (curr && curr.solved) || solved
		});
		// update local level completion data
		dispatch(updateLevelCompletionData(packName, levelNumber, data));
		return data;
	})
}


