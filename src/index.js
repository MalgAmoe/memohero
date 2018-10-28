import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import './index.css'
import App from './App'
import reducers from './reducers'

const combinedReducers = combineReducers(reducers)
const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(combinedReducers, undefined, composeWithDevTools(middlewareEnhancer))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
