import {REACT_APP_DEV_TOOLS } from '../store/entorno'

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const composeEnhancers = REACT_APP_DEV_TOOLS === 'on' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
