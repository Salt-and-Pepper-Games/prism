import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { initGame } from './game';
import { initDrawingMethods } from './utils/drawingMethods';

// this adds the roundedRect method to the 2d canvas context
initDrawingMethods();

const store = createStore(rootReducer, applyMiddleware(thunk));
initGame(store);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
