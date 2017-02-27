import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

// initialize redux store with middleware that allows for better handling of async actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// initialize rendering to the DOM
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container'));
