import update from 'immutability-helper';
import { ItemTypes } from '../utils';
const isGlobal = false;
export const blocksReducer = (state = {
    blocks: {
        1: { id: 1,top: 100-50, left: 20, type: ItemTypes.MOTION, action: "Move 10 steps", isGlobal: true },
        2: { id: 2,top: 200-50, left: 20, type: ItemTypes.MOTION, action: "Move 20 steps", isGlobal: true },
        3: { id: 3,top: 300-50, left: 20, type: ItemTypes.MOTION, action: "Move 30 steps", isGlobal: true },
        4: { id: 4,top: 400-50, left: 20, type: ItemTypes.MOTION, action: "Move 40 steps", isGlobal: true },
        5: { id: 5,top: 500-50, left: 20, type: ItemTypes.MOTION, action: "Move 10 steps", isGlobal: true },
        6: { id: 6,top: 600-50, left: 20, type: ItemTypes.MOTION, action: "Move 20 steps", isGlobal: true },
        7: { id: 7,top: 700-50, left: 20, type: ItemTypes.MOTION, action: "Move 30 steps", isGlobal: true },
        8: { id: 8,top: 800-50, left: 20, type: ItemTypes.MOTION, action: "Move 40 steps", isGlobal: true },
        9: { id: 9,top: 900-50, left: 20, type: ItemTypes.MOTION, action: "Move 50 steps", isGlobal: true },
    }
}, _action) => {
    switch (_action.type) {
        case "ADD_IN_CONTAINER":
            return state;
        case "ADD_BLOCK":
            const { position: { didDrop }, dragged: { id, index, type, action } } = _action.payload;

            // const { id, type, action: actionType, isGlobal = false } = _action.payload.dragged;
            return update(state, {
                blocks: {
                    [id]: {
                        $set: {
                            id, type, isGlobal, action,
                        },
                    },
                },
            });
        default:
            return state;
    }
}