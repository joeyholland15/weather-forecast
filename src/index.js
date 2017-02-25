import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import thunk from 'redux-thunk';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container'));
