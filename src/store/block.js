import update from 'immutability-helper';
import { uniqueId } from "lodash";
import { ItemTypes } from '../utils';

const globalSubstring = "g_";
const getGlobalUId = () => uniqueId(globalSubstring);

const getNumber = (value) => isNaN(Number(value)) ? 0 : Number(value).toString();
const getNegativeNumber = (value) => isNaN(Number(value)) ? 0 : `-${Number(Math.abs(value)).toString()}`;

const isGlobalBlock = (block) => !block.hasOwnProperty("rootIdx") && !block.hasOwnProperty("idx");
export const checkIsHoveringAbove = ({ hoverBoundingRect, clientOffset }) => {
    // Determine rectangle on screen
    // const hoverBoundingRect = ref.current?.getBoundingClientRect();
    // const clientOffset = monitor.getClientOffset();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    var addToTop = true;
    if (
        // dragIndex < hoverIndex && 
        hoverClientY < hoverMiddleY) {
        addToTop = true;
        // // console.log("Add on top");
        // return;
    }
    // Dragging upwards
    if (
        // dragIndex > hoverIndex && 
        hoverClientY > hoverMiddleY) {
        // // console.log("Add on below");
        addToTop = false;
        // return;
    }
    return addToTop;
}

export const CHANGE_SIZE_BY = "CHANGE_SIZE_BY";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const HIDE_SVG = "HIDE_SVG";
export const SHOW_SVG = "SHOW_SVG";

export function blockReducer(state = {
    globalBlocks: {
        1: { id: 1, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "MOVE", value: "10", title: "Move {x} steps" } },
        2: { id: 2, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "ROTATE_CLOCKWISE", value: "10", title: "Rotate {x} degree" } },
        3: { id: 3, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "ROTATE_ANTICLOCKWISE", value: "-10", title: "Move {-x} degree" } },
        4: { id: 4, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "GO_TO_COORDINATES", value: [10, 10], title: "Go to {x},{y}" } },
        5: { id: 5, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "GLIDE_TO_COORDINATES", value: [2, 10, 10], title: "Glide t sec to {x},{y}" } },
        
        // single inputs
        6: { id: 6, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "POINT_IN_DIRECTION", value: 90, title: "point in direction" } },
        7: { id: 7, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "CHANGE_X_BY", value: 0, title: "change x by" } },
        8: { id: 8, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "CHANGE_Y_BY", value: 0, title: "change y by" } },
        9: { id: 9, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "SET_X_TO", value: 0, title: "set x to" } },
        10: { id: 10, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: "SET_Y_TO", value: 0, title: "set y to" } },

        11: { id: 11, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: CHANGE_SIZE_BY, value: 1, title: "change size by" }},
        12: { id: 12, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: CHANGE_SIZE, value: 100, title: "change size to {x} %" }},

        13: { id: 13, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: HIDE_SVG, title: " hide " }},
        14: { id: 14, uId: getGlobalUId(), type: ItemTypes.MOTION, action: { name: SHOW_SVG, title: " show " }}
    },
    blocks:
        [
            {
                position: { top: 120, left: 300 },
                children: [{
                    id: uniqueId(),
                    type: "Motion",
                    action: { name: "MOVE", value: 10, title: `Move 10 steps` }
                }],
            }
        ]
}
    , action = { payload: {} }) {
    let dropped;
    let dragged;
    let position;
    dropped = action?.payload?.dropped;
    dragged = action?.payload?.dragged;
    position = action?.payload?.position;
    switch (action.type) {
        case "MOVE_TO_MID":
            if (isGlobalBlock(dropped)) {
                return update(state, {
                    blocks: {
                        $push: [
                            {
                                position: {
                                    top: Math.abs(position.finalPosition.y),
                                    left: position.finalPosition.x - position.initialPosition.x,
                                },
                                children: [
                                    {
                                        id: dropped.id,
                                        type: dropped.type,
                                        action: dropped.action,
                                    }
                                ]
                            }
                        ]
                    }
                });
            } else {
                const newState = { ...state };
                const children = newState.blocks[dropped.rootIdx].children.splice(dropped.idx);
                if (newState.blocks[dropped.rootIdx].children.length == 0) {
                    newState.blocks.splice(dropped.rootIdx, 1);
                }
                return update(newState, {
                    blocks: {
                        $push: [{
                            position: {
                                top: Math.abs(position.finalPosition.y) - 15,
                                left: position.finalPosition.x,
                            },
                            children,
                        }]
                    }
                })
            }
        case "MOVE_IN_CONTAINER":
            let addAfterItemIdx = checkIsHoveringAbove(position);
            if (isGlobalBlock(dragged)) {
                return update(state, {
                    blocks: {
                        [dropped.rootIdx]: {
                            children: {
                                $splice: !addAfterItemIdx ? [[dropped.idx + 1, 0, { ...dragged }]] : [[dropped.idx, 0, { ...dragged }]],
                            }
                        }
                    }
                })
            } else {
                const newState = { ...state };
                const children = newState.blocks[dragged.rootIdx].children.splice(dragged.idx);
                if (newState.blocks[dragged.rootIdx].children.length == 0) {
                    newState.blocks.splice(dragged.rootIdx, 1);
                }
                return update(state, {
                    blocks: {
                        [dropped.rootIdx]: {
                            children: {
                                $splice: !addAfterItemIdx ? [[dropped.idx + 1, 0, ...children]] : [[dropped.idx, 0, ...children]],
                            }
                        }
                    }
                })
            }

            return state;
        case "SWITCH_UID":
            return update(state, {
                globalBlocks: {
                    [action.payload.id]: {
                        uId: {
                            $set: getGlobalUId(),
                        }
                    }
                }
            });
        case "MODIFY_BLOCK":
            if (action.payload.rootId === undefined) {
                switch (action.payload.name) {
                    case ["MOVE","CHANGE_X_BY", "CHANGE_Y_BY","SET_X_TO", "SET_Y_TO"]:
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: getNumber(action.payload.value) },
                                    }
                                }
                            }
                        });
                    case "ROTATE_CLOCKWISE":
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: getNumber(action.payload.value) },
                                    }
                                }
                            }
                        });
                    case "ROTATE_ANTICLOCKWISE":
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: getNegativeNumber(action.payload.value) },
                                    }
                                }
                            }
                        });
                    case "GO_TO_COORDINATES":
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: (action.payload.value) },
                                    }
                                }
                            }
                        });
                    case "GLIDE_TO_COORDINATES":
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: (action.payload.value) },
                                    }
                                }
                            }
                        });
                    case "POINT_IN_DIRECTION":
                        // alert();
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: (action.payload.value) },
                                    }
                                }
                            }
                        });
                    default:
                        return update(state, {
                            globalBlocks: {
                                [action.payload.id]: {
                                    action: {
                                        value: { $set: getNumber(action.payload.value) },
                                    }
                                }
                            }
                        });
                }
            } else {

                switch (action.payload.name) {
                    case ["MOVE","CHANGE_X_BY", "CHANGE_Y_BY","SET_X_TO", "SET_Y_TO"]:
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: getNumber(action.payload.value) },
                                            }
                                        }

                                    }
                                }
                            }
                        });
                    case "ROTATE_CLOCKWISE":
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: getNumber(action.payload.value) },
                                            }
                                        }

                                    }
                                }
                            }
                        });
                    case "ROTATE_ANTICLOCKWISE":
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: getNegativeNumber(action.payload.value) },
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    case "GO_TO_COORDINATES":
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: (action.payload.value) },
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    case "POINT_IN_DIRECTION":
                        // alert();
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: (action.payload.value) },
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    default:
                        return update(state, {
                            blocks: {
                                [action.payload.rootId]: {
                                    children: {
                                        [action.payload.id]: {
                                            action: {
                                                value: { $set: (action.payload.value) },
                                            }
                                        }
                                    }
                                }
                            }
                        });
                }
            }
        default:
            return state;
    }
}

