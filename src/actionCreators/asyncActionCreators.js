import uiActionCreators from './uiActionCreators';
import { closeLevelAction, loadLevelAction } from './levelActionCreators';
import { setUserAction, setLevelCompletionData } from './userActionCreators';
import firebase from '../utils/initFirebase';

export const loadLevelString = (levelNumber, packName) => {
	return dispatch => {
		console.log(levelNumber, packName);
		const packRef = firebase.database().ref(`levelData/${packName}Pack`);
		packRef.once("value").then(snapshot => {
			const levelString = snapshot.child(`level${levelNumber}`).val();
			const packInfo = snapshot.child(`packInfo`).val();
			return { levelString, packInfo };
		}).then(levelInfo => {
			if (levelInfo) {
				const levelObject = {
					levelString: levelInfo.levelString,
					levelNumber: levelNumber,
					packInfo: levelInfo.packInfo
				};
				dispatch(loadLevelAction(levelObject));
				dispatch(uiActionCreators.openGameMode());
			// TODO: Add in error handling
			} else {
				console.log("There was an error loading the level");
			}
		});
	};
}
export const getPackInfo = () => {
	return dispatch => {
		const levelsRef = firebase.database().ref("levelData");
		const packInfo = [];
		levelsRef.once("value").then(snapshot => {
			const packNames = snapshot.child("packNames").val();
			for (const packName in packNames) {
				packInfo.push(levelsRef.once("value").then(snapshot => {
					return snapshot.child(`${packName}Pack/packInfo`).val();
				}));
			}
			return packInfo;
		}).then(packInfo => {
			Promise.all(packInfo).then(resolvedPacks => {
				dispatch(uiActionCreators.setPackInfo(resolvedPacks));
			});
		});
	};
};

export const closeLevel = (state) => {
	return dispatch => {
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
		});
		dispatch(closeLevelAction());
	}
}

export const setupFirebaseListeners = () => {
		return dispatch => {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					dispatch(setUserAction(user));
					firebase.database().ref(`users/${user.uid}`)
						.once('value').then(snapshot => {
							// TODO: this is where we would load user level completion data
							dispatch(setLevelCompletionData(snapshot.child('levelData').val()));
						});
				}
				else {
					firebase.auth().signInAnonymously().catch(error => {
					});
				}
			});
	}
}
