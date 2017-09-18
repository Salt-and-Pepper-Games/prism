import uiActionCreators from './uiActionCreators';
import { closeLevelAction, loadLevelAction } from './levelActionCreators';
import { setUserAction, setLevelCompletionData } from './userActionCreators';
import firebase from '../utils/initFirebase';

export const loadLevelString = (levelNumber, packInfo) => {
	return dispatch => {
		const packRef = firebase.database().ref(`levelData/${packInfo.packName}Pack`);
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

export const setupFirebaseListeners = () => {
		return dispatch => {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					dispatch(setUserAction(user));
					firebase.database().ref(`users/${user.uid}`)
						.once('value').then(snapshot => {
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
