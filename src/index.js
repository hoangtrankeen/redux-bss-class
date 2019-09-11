// simple example, no react-redux
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import './App.css';
import {rootReducer} from './reducers'
import {Provider} from 'react-redux'
import App from './App'

let store = createStore(rootReducer, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);