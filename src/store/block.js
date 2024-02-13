import { ItemTypes } from '../utils';
import update from 'immutability-helper';
import { uniqueId } from 'lodash';
const globalSubstring = "g_";
const getGlobalUId = () => uniqueId(globalSubstring);
export const blocksReducer = (state = {
    blocks: {
        1: { id: 1, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 10 steps", isGlobal: true },
        2: { id: 2, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 20 steps", isGlobal: true },
        3: { id: 3, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 30 steps", isGlobal: true },
        4: { id: 4, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 40 steps", isGlobal: true },
        5: { id: 5, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 10 steps", isGlobal: true },
        6: { id: 6, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 20 steps", isGlobal: true },
        7: { id: 7, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 30 steps", isGlobal: true },
        8: { id: 8, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 40 steps", isGlobal: true },
        9: { id: 9, uId: getGlobalUId(), type: ItemTypes.MOTION, action: "Move 50 steps", isGlobal: true },
    }
}, action) => {
    switch (action.type) {
        case "SWITCH_UID":
            return update(state, {
                blocks: {
                    [action.payload.id]: {
                        uId: {
                            $set: getGlobalUId(),
                        }
                    }
                }
            });
        default:
            return state;
    }
}