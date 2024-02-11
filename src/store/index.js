import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { sideBlockReducer } from "./sideBlock";
import { midBlockReducer } from "./midBlock";
import { blocksCoordinatesReducer } from "./blockCoordinate";
import logger from "redux-logger";
import { blocksReducer } from "./block";
import { blockMapReducer } from "./blockMap";
const reducer = combineReducers({
    sideBlocks: sideBlockReducer,
    midBlocks: midBlockReducer,

    blocks: blocksReducer,
    blocksCoordinates: blocksCoordinatesReducer,
    blocksMap: blockMapReducer
});

const middlewareEnhancer = applyMiddleware(thunk, logger);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(reducer, undefined, composedEnhancers);

export default store;
