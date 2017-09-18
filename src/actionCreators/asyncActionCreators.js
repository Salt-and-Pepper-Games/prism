import uiActionCreators from './uiActionCreators';
import { closeLevelAction, loadLevelAction } from './levelActionCreators';
import { setUserAction, setLevelCompletionData } from './userActionCreators';
import firebase from '../utils/initFirebase';

export const loadLevelString = (levelNumber, packInfo) => {
	return dispatch => {
		const packRef = firebase.database().ref(`levelStrings/${packInfo.packName}Pack`);
		packRef.once("value").then(snapshot => {
			return snapshot.child(`level${levelNumber}`).val();
		}).then(levelString => {
			if (levelString) {
				const levelObject = {
					levelString,
					levelNumber,
					packInfo
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
