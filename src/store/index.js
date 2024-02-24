import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { blockReducer } from "./block";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { previewReducer } from "./preview";
import undoable from 'redux-undo';



const rootReducer = combineReducers({
  dnd: blockReducer,
  preview: undoable(previewReducer, {
    // ignoreInitialState: false,
    neverSkipReducer: false, // prevent undoable from skipping the reducer on undo/redo and clearHistoryType actions
    syncFilter: false
  }),
});

const middlewareEnhancer = applyMiddleware(thunk, logger);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;
