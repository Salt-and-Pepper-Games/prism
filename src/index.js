import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import './styles/index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './rootReducer';
import { setupFirebaseListeners } from './actionCreators/asyncActionCreators';

const history = createHistory();

// last action reducer
const lastAction = (state = null, action) => {
	return action;
};

const store = createStore(
	combineReducers({...reducers,
		router: routerReducer,
		lastAction
	}),
	applyMiddleware(thunk, routerMiddleware(history))
);
store.dispatch(setupFirebaseListeners());


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
