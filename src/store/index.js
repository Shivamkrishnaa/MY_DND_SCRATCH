import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { blockReducer } from "./midBlock";
import logger from "redux-logger";


const middlewareEnhancer = applyMiddleware(thunk, logger);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(blockReducer, undefined, composedEnhancers);

export default store;
