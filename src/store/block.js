import update from 'immutability-helper';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';
const isGlobal = false;
export const blocksReducer = (state = {
    blocks: {
        1: { id: 1, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 21 steps", isGlobal: true },
        2: { id: 2, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 22 steps", isGlobal: true },
        3: { id: 3, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 23 steps", isGlobal: true },
        4: { id: 4, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 24 steps", isGlobal: true },
        5: { id: 5, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 21 steps", isGlobal: true },
        6: { id: 6, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 12 steps", isGlobal: true },
        7: { id: 7, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 13 steps", isGlobal: true },
        8: { id: 8, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 18 steps", isGlobal: true },
        9: { id: 9, uId: uniqueId("g_"), type: ItemTypes.MOTION, action: "Move 19 steps", isGlobal: true },
    }
}, _action) => {
    switch (_action.type) {
        case "SWITCH_BLOCK_UID": 
            var newState = { ...state };
            var { dragged } = _action.payload;
            newState.blocks[dragged.id].uId = uniqueId("g_");
            return newState;
        case "MOVE_IN_CONTAINER":
            var newState = {...state};
            var { dragged, dropped, uId } = _action.payload;
            if(!dragged.hasOwnProperty("rootId")) {
                if(dropped.hasOwnProperty("rootId")) {
                    
                    newState.blocks[uId] = {
                        id: uId,
                        ...dragged,
                    }
                    
                    // console.log(newState,' newSubBlock ', dragged, dropped);
                }
            } else {
                if (dragged.index == 0) {

                }
            }
            return newState;
        case "MOVE_TO_MID":
            var { dragged: { id, rootId, type, action, uId } } = _action.payload;
            if(!rootId) {
                return update(state, {
                    blocks: {
                        [uId]: {
                            $set: {
                                id: uId, type, action,
                            },
                        },
                    },
                });
            }
            // const { id, type, action: actionType, isGlobal = false } = _action.payload.dragged;
        default:
            return state;
    }
}