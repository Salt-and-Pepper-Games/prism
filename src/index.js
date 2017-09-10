import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './styles/index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { initGame } from './game';
import { setupKeyboardInput } from './utils/keyboardInput';

const store = createStore(rootReducer, applyMiddleware(thunk));
initGame(store);

setupKeyboardInput(store);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
