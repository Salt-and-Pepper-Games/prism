import firebase from 'firebase';

export const saveData = (state) => {
	// upload stuff to firebase
	const levelNumber = state.game.board.levelNumber;
	const packName = state.game.board.packInfo.packName;
	const uid = state.game.user.id;
	const solved = state.game.board.stats.solved;
	const ref = firebase.database().ref(`users/${uid}/levelData/${packName}/${levelNumber}`);
	ref.transaction(curr => {
		return Object.assign({}, curr || {}, {
			solved: (curr && curr.solved) || solved
		});
	})
}


