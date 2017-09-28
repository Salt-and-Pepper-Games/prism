import firebase from 'firebase';
import { setUserStats, updateLevelCompletionData } from '../actionCreators/userActionCreators';

const config = {
	apiKey: "AIzaSyAgfYibGQ6G_vzwNJkyl5GLU_fepDGLdas",
	authDomain: "prism-d2f60.firebaseapp.com",
	databaseURL: "https://prism-d2f60.firebaseio.com",
	projectId: "prism-d2f60",
	storageBucket: "prism-d2f60.appspot.com",
	messagingSenderId: "326084561023"
};
firebase.initializeApp(config);

export const saveData = (state, dispatch) => {
	console.log("Saving data");
	// upload stuff to firebase
	const stats = state.game.board.stats;
	const { solved } = stats;

	const levelNumber = state.game.board.levelNumber;
	const packName = state.game.board.packInfo.packName;
	const uid = state.game.user.id;
	const ref = firebase.database().ref(`users/${uid}/levelData/${packName}/${levelNumber}`);
	ref.transaction(curr => {
		const alreadySolved = curr && curr.solved;
		const data = Object.assign({}, curr || {}, {
			solved: alreadySolved || solved
		});
		// update local level completion data
		console.log('saving data');
		dispatch(updateLevelCompletionData(packName, levelNumber, data));
		return data;
	});

	// updating user stats
	const userStatsRef = firebase.database().ref(`users/${uid}/stats`);
	userStatsRef.transaction(curr => {
		const prevState = curr || {};
		const levelsCompleted = (prevState.levelsCompleted || 0) + (solved ? 1 : 0);
		const moves = (prevState.moves || 0) + stats.moves;
		const switches = (prevState.switches || 0) + stats.switches;
		const elapsedTime = (prevState.elapsedTime || 0) + stats.elapsedTime;
		const newStats = Object.assign({}, prevState, {
			levelsCompleted,
			moves,
			switches,
			elapsedTime
		});
		dispatch(setUserStats(newStats));
		return newStats;
	});

	// updating internal level stats
	const levelStatsRef = firebase.database().ref('levelStats');
	const levelStatsData = stats;
	stats.userId = uid;
	stats.levelNumber = levelNumber;
	stats.packName = packName;
	levelStatsRef.push(levelStatsData);
}

export default firebase;
