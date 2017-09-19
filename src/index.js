import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './styles/index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './rootReducer';
import { setupFirebaseListeners } from './actionCreators/asyncActionCreators';

const history = createHistory();

const store = createStore(
	combineReducers({...reducers,
		router: routerReducer
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
