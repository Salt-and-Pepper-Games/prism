import uiActionCreators from './uiActionCreators';
import levelActionCreators from './levelActionCreators';
import firebase from '../utils/initFirebase';

export default {
	loadLevelString: (levelNum, packInfo) => {
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
					dispatch(levelActionCreators.loadLevelAction(levelObject));
					dispatch(uiActionCreators.openGameMode());
				// TODO: Add in error handling
				} else {
					console.log("There was an error loading the level");
				}
			});
		};
	}
};
