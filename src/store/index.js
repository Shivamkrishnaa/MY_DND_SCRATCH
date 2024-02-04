import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { blocksCoordinatesReducer } from "./blockCoordinate";
import logger from "redux-logger";
import { blocksReducer } from "./block";
import { blockMapReducer } from "./blockMap";

const reducer = combineReducers({
    blocks: blocksReducer,
    blocksCoordinates: blocksCoordinatesReducer,
    blockMap: blockMapReducer,
});

const middlewareEnhancer = applyMiddleware(thunk, logger);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(reducer, undefined, composedEnhancers);

export default store;
