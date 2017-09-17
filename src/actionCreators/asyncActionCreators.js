import uiActionCreators from './uiActionCreators';
import { loadLevelAction } from './levelActionCreators';
import { setUserAction, setLevelCompletionData } from './userActionCreators';
import firebase from '../utils/initFirebase';

export const loadLevelString = (levelNum, packInfo) => {
	return dispatch => {
		const packRef = firebase.database().ref(`levelStrings/${packInfo.packName}Pack`);
		packRef.once("value").then(snapshot => {
			return snapshot.child(`level${levelNum}`).val();
		}).then(levelString => {
			if (levelString) {
				const levelObject = {
					levelString,
					levelNum,
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
