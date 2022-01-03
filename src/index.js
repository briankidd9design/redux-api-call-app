import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//The apply middleware function is how to apply a middleware like thunk to our redux store itself. 
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//with the middleware of thunk you are able to pass functions
const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
    // <Provider store={createStore(reducers)}>  
    <Provider store={store}>  
    <App />
    </Provider>,
    document.querySelector("#root")
)

