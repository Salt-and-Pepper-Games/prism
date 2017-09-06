"use strict";

const uiActionNames = require('../../actionCreators/uiActionNames.js');

const initialState = {
	currentModal: null
};

const ui = (state = initialState, action) => {
	switch (action.type) {
		case uiActionNames.SET_CURRENT_MODAL: 
			return Object.assign({}, state, { currentModal: action.currentModal });
		default:
			return state;
	};
};

module.exports = ui;