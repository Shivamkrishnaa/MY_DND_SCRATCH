import update from 'immutability-helper';
import { ItemTypes } from '../utils';
const isGlobal = false;
export const sideBlockReducer = (state = {
    blocks: [
        { id: 1, type: ItemTypes.MOTION, action: "Move 10 steps" },
        { id: 2, type: ItemTypes.MOTION, action: "Move 20 steps" },
        { id: 3, type: ItemTypes.MOTION, action: "Move 30 steps" },
        { id: 4, type: ItemTypes.MOTION, action: "Move 40 steps" },
        { id: 5, type: ItemTypes.MOTION, action: "Move 10 steps" },
        { id: 6, type: ItemTypes.MOTION, action: "Move 20 steps" },
        { id: 7, type: ItemTypes.MOTION, action: "Move 30 steps" },
        { id: 8, type: ItemTypes.MOTION, action: "Move 40 steps" },
        { id: 9, type: ItemTypes.MOTION, action: "Move 50 steps" },
    ],
}, _action) => {
    switch (_action.type) {
        // case "ADD_IN_CONTAINER":
        //     return state;
        // case "ADD_BLOCK":
        //     const { position: { didDrop }, dragged: { id, index, type, action } } = _action.payload;

        //     // const { id, type, action: actionType, isGlobal = false } = _action.payload.dragged;
        //     return update(state, {
        //         blocks: {
        //             [id]: {
        //                 $set: {
        //                     id, type, isGlobal, action,
        //                 },
        //             },
        //         },
        //     });
        default:
            return state;
    }
}