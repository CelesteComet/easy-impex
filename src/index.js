import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

// Middleware
import prefixAttacher from './middleware/prefixAttacher';

const middleware = applyMiddleware(prefixAttacher);
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

ReactDOM.render(
	<Provider store={ store }>
		<App store={ store}/>
	</Provider>, 
document.getElementById('root'));
registerServiceWorker();
