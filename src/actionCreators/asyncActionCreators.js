import * as uiActionCreators from './uiActionCreators';
import { loadLevelAction } from './levelActionCreators';
import { setUserStats, setUserAction, setLevelCompletionData } from './userActionCreators';
import firebase from 'firebase';

export const loadLevelString = (levelNumber, packName) => {
	return (dispatch, store) => {
		dispatch(uiActionCreators.showLoader());
		const packRef = firebase.database().ref(`levelData/${packName}Pack`);
		packRef.once("value").then(snapshot => {
			const levelString = snapshot.child(`level${levelNumber}`).val();
			if (levelString) {
				const packInfo = snapshot.child(`packInfo`).val();
				return { levelString, packInfo };
			}
			else {
				throw new Error("Level not found");
			}
		}).then(levelInfo => {
			if (levelInfo) {
				const levelObject = {
					levelString: levelInfo.levelString,
					levelNumber: levelNumber,
					packInfo: levelInfo.packInfo
				};
				dispatch(uiActionCreators.hideLoader());
				dispatch(uiActionCreators.setCurrentPack(levelInfo.packInfo));
				dispatch(loadLevelAction(levelObject));
				dispatch(uiActionCreators.openGameMode());
				
			// TODO: Add in error handling
			} else {
				console.log("There was an error loading the level");
			}
		})
		.catch(err => {
			console.log(err);
		});
	};
}
export const getPackInfo = () => {
	return dispatch => {
		dispatch(uiActionCreators.showLoader());
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
				setTimeout(() => {
					dispatch(uiActionCreators.hideLoader());
					dispatch(uiActionCreators.setPackInfo(resolvedPacks));
				}, 0);
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
							dispatch(setUserStats(snapshot.child('stats').val()));
						});
				}
				else {
					firebase.auth().signInAnonymously().catch(error => {
					});
				}
			});
	}
}
