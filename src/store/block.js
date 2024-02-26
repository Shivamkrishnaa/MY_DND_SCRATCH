import _ from "lodash";
import update from 'immutability-helper';
import { cloneDeep, uniqueId } from "lodash";
import { ItemTypes } from '../utils';

const globalSubstring = "g_";
// const globalSpriteSubstring = "s_";
const getGlobalUId = () => uniqueId(globalSubstring);
const globalSpriteSubstring = "s_";

export const getSpriteUId = () => uniqueId(globalSpriteSubstring);

const parseNumber = (value) => isNaN(Number(value)) ? 0 : Number(value);
const getNumber = (value) => isNaN(Number(value)) ? 0 : Number(value).toString();
const getNegativeNumber = (value) => isNaN(Number(value)) ? 0 : `-${Number(Math.abs(value)).toString()}`;

const isGlobalBlock = (block) => !block.hasOwnProperty("rootIdx");
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
        // return;
    }
    // Dragging upwards
    if (
        // dragIndex > hoverIndex && 
        hoverClientY > hoverMiddleY) {
        addToTop = false;
        // return;
    }
    return addToTop;
}

export const MOVE = "MOVE";
export const ROTATE_CLOCKWISE = "ROTATE_CLOCKWISE";
export const ROTATE_ANTICLOCKWISE = "ROTATE_ANTICLOCKWISE";
export const GO_TO_COORDINATES = "GO_TO_COORDINATES";
export const GLIDE_TO_COORDINATES = "GLIDE_TO_COORDINATES";
export const POINT_IN_DIRECTION = "POINT_IN_DIRECTION";
export const CHANGE_X_BY = "CHANGE_X_BY";
export const CHANGE_Y_BY = "CHANGE_Y_BY";
export const SET_X_TO = "SET_X_TO";
export const SET_Y_TO = "SET_Y_TO";


export const CHANGE_SIZE_BY = "CHANGE_SIZE_BY";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const HIDE_SVG = "HIDE_SVG";
export const SHOW_SVG = "SHOW_SVG";
export const THINK_BUBBLE = "THINK_BUBBLE";
export const SAY_BUBBLE = "SAY_BUBBLE";
export const THINK_BUBBLE_FOR = "THINK_BUBBLE_FOR";
export const SAY_BUBBLE_FOR = "SAY_BUBBLE_FOR";
export const PLAY = "PLAY";
const initialGlobalState = {
    1: { id: 1, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: MOVE, value: "10", title: "move {x} steps", customProps: {type: "number", min: -100, max: 100 } } },
    2: { id: 2, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { icon: "redo", name: ROTATE_CLOCKWISE, value: "10", title: "rotate {x} degree" } },
    3: { id: 3, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { icon: "undo", name: ROTATE_ANTICLOCKWISE, value: "-10", title: "rotate {x} degree" } },
    4: { id: 4, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: GO_TO_COORDINATES, value: [10, 10], title: "go to x: {x} y:" } },
    5: { id: 5, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: GLIDE_TO_COORDINATES, value: [2, 10, 10], title: "glide t sec to {x} {x}" } },

    // single inputs
    6: { id: 6, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: POINT_IN_DIRECTION, value: "90", title: "point in direction {x} degree" } },
    7: { id: 7, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: CHANGE_X_BY, value: "0", title: "change x by" } },
    8: { id: 8, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: CHANGE_Y_BY, value: "0", title: "change y by" } },
    9: { id: 9, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: SET_X_TO, value: "0", title: "set x to" } },
    10: { id: 10, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: SET_Y_TO, value: "0", title: "set y to" } },
    11: { id: 11, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: CHANGE_SIZE_BY, value: "1", title: "change size by" } },
    12: { id: 12, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Motion", action: { name: CHANGE_SIZE, value: "10", title: "change size to {x} %" } },

    13: { id: 13, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: HIDE_SVG, title: " hide " } },
    14: { id: 14, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: SHOW_SVG, title: " show " } },
    15: { id: 15, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: THINK_BUBBLE, value: "hmm", title: " think {x} ", type: "thought" } },
    16: { id: 16, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: THINK_BUBBLE_FOR, value: ["hmmm...", 1], type: "thought", title: " think  {x} for {x} seconds " } },
    17: { id: 17, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: SAY_BUBBLE, value: "Hii", title: " say {x} ", type: "speech" } },
    18: { id: 18, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Looks", action: { color: "purple", name: SAY_BUBBLE_FOR, value: ["Hii", 1], title: " say {x} for {x} seconds ", type: "speech" } },
    19: { id: 19, uId: getGlobalUId(), type: ItemTypes.BLOCK, category: "Events", action: { color: "yellow", name: PLAY, title: " play " } },
};
export const blockCategories = Object.freeze(_.groupBy(Object.values(initialGlobalState), 'category'));
export const defaultCategories = Object.freeze(Object.keys(blockCategories));

export const defaultHeight = 100.04156036376953;
export const defaultWidth = 95.17898101806641;
export const defaultTransform = 1;
export const defaultSpriteData = {
    top: 0,
    left: 0,
    rotate: 0,
    transition: '',
    display: "block",
    width: defaultWidth,
    height: defaultHeight,
    transform: defaultTransform,
    bubble: {
        text: false,
        type: "say",
        time: 0,
    }
}
const defaultSprite = {
    id: 1,
    ...defaultSpriteData,
}
export const getNewSprite = () => update(defaultSprite, {
    $merge: {
        id: getSpriteUId(),
    }
});
export const initialSprite = getNewSprite();
const getDefaultNewBlock = () => ({
    position: { top: 120, left: 300 },
    children: [{
        id: uniqueId(),
        type: ItemTypes.BLOCK,
        action: cloneDeep(initialGlobalState[1].action)
    }],
})
export function blockReducer(state = {
    globalBlocks: initialGlobalState,
    blocks: {
        // [initialSprite.id]: [
        //     getDefaultNewBlock(),
        // ],
    },
    // sprite: { [initialSprite.id]: defaultSprite },
    // spriteId: initialSprite.id,
}
    , action = { payload: {} }) {
    let dropped;
    let dragged;
    let position;
    let spriteId = action?.payload?.spriteId;
    dropped = action?.payload?.dropped;
    dragged = action?.payload?.dragged;
    position = action?.payload?.position;
    let newState = state;
    if(spriteId) {
        if(!state.blocks.hasOwnProperty(spriteId)) {
            
            newState = update(newState,{
                blocks: {
                    [spriteId]: { $set: []},
                }
            });
        }
    }
    switch (action.type) {
        case "MOVE_TO_MID":
            if (isGlobalBlock(dropped)) {
                return update(newState, {
                    globalBlocks: {
                        [action.payload.dropped.idx]: {
                            uId: {
                                $set: getGlobalUId(),
                            },
                        },
                    },
                    blocks: {
                        [spriteId]: {
                            $push: [
                                {
                                    position: {
                                        top: Math.abs(position.finalPosition.y),
                                        left: position.finalPosition.x - position.initialPosition.x,
                                    },
                                    children: [
                                        {
                                            id: dropped.id,
                                            // type: dropped.type,
                                            action: dropped.action,
                                        },
                                    ]
                                },
                            ]
                        },
                    },
                });
            } else {
                const children = newState.blocks[spriteId][dropped.rootIdx].children.splice(dropped.idx);
                if (newState.blocks[spriteId][dropped.rootIdx].children.length == 0) {
                    newState.blocks[spriteId].splice(dropped.rootIdx, 1);
                }
                return update(newState, {
                    blocks: {
                        [spriteId]: {
                            $push: [{
                                position: {
                                    top: Math.abs(position.finalPosition.y) - 15,
                                    left: position.finalPosition.x,
                                },
                                children,
                            }]
                        }
                    }
                })
            };
        // // const newState = JSON.parse(JSON.stringify(state));
        // // const children = newState.blocks[dropped.rootIdx].children.splice(dropped.idx);
        // // if (newState.blocks[dropped.rootIdx].children.length == 0) {
        // //     newState.blocks.splice(dropped.rootIdx, 1);
        // // }
        // return update(newState, {
        //     blocks: {
        //         [spriteId]: {
        //             [dropped.rootIdx] : {
        //                 position: {
        //                     $merge: {
        //                         top: Math.abs(position.finalPosition.y) - 15,
        //                         left: position.finalPosition.x,
        //                     },
        //                 },
        //             },
        //             // $push: [{
        //             //     children,
        //             // }]
        //         },
        //     },
        // });
        // };
        case "MOVE_IN_CONTAINER":
            let addAfterItemIdx = action.payload.addAfterItemIdx;
            if (isGlobalBlock(dragged)) {
                return update(newState, {
                    blocks: {
                        [spriteId]: {
                            [dropped.rootIdx]: {
                                children: {
                                    $splice: !addAfterItemIdx ? [[dropped.idx + 1, 0, { ...dragged }]] : [[dropped.idx, 0, { ...dragged }]],
                                }
                            },
                        },
                    },
                })
            } else {
                const newState = cloneDeep({ ...state });
                const children = newState.blocks[spriteId][dragged.rootIdx].children.splice(dragged.idx);
                const newState2 = update(newState, {
                    blocks: {
                        [spriteId]: {
                            [dropped.rootIdx]: {
                                children: {
                                    $splice: !addAfterItemIdx ? [[(dropped.idx + 1), 0, ...children]] : [[dropped.idx, 0, ...children]],
                                }
                            }
                        }
                    }
                });
                // remove empty block
                if (newState2.blocks[spriteId][dragged.rootIdx].children.length == 0) {
                    newState2.blocks[spriteId].splice(dragged.rootIdx, 1);
                }
                return newState2;
            };
        case "MODIFY_BLOCK":
            if (action.payload.rootId === undefined) {
                const { id, name, value } = action.payload;
                const updatedAction = { value: { $set: value } };

                switch (name) {
                    case MOVE:
                    case CHANGE_X_BY:
                    case CHANGE_Y_BY:
                    case SET_X_TO:
                    case SET_Y_TO:
                    case ROTATE_CLOCKWISE:
                        return update(newState, {
                            globalBlocks: {
                                [id]: {
                                    action: updatedAction
                                }
                            }
                        });

                    case ROTATE_ANTICLOCKWISE:
                        return update(newState, {
                            globalBlocks: {
                                [id]: {
                                    action: {
                                        value: { $set: getNegativeNumber(value) },
                                    }
                                }
                            }
                        });

                    case GO_TO_COORDINATES:
                    case GLIDE_TO_COORDINATES:
                    case POINT_IN_DIRECTION:
                        return update(newState, {
                            globalBlocks: {
                                [id]: {
                                    action: updatedAction
                                }
                            }
                        });

                    default:
                        return update(newState, {
                            globalBlocks: {
                                [id]: {
                                    action: updatedAction
                                }
                            }
                        });
                }

            } else {
                const { rootId, id, name, value } = action.payload;
                const updatedAction = { value: { $set: value } };

                switch (name) {
                    case MOVE:
                    case CHANGE_X_BY:
                    case CHANGE_Y_BY:
                    case SET_X_TO:
                    case SET_Y_TO:
                    case CHANGE_SIZE_BY:
                    case CHANGE_SIZE:
                    case ROTATE_CLOCKWISE:
                        return update(newState, {
                            blocks: {
                                [spriteId]: {
                                    [rootId]: {
                                        children: {
                                            [id]: {
                                                action: updatedAction
                                            }
                                        }
                                    }
                                }
                            }
                        });

                    case ROTATE_ANTICLOCKWISE:
                        return update(newState, {
                            blocks: {
                                [spriteId]: {
                                    [rootId]: {
                                        children: {
                                            [id]: {
                                                action: {
                                                    value: { $set: getNegativeNumber(value) },
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });

                    case GO_TO_COORDINATES:
                    case POINT_IN_DIRECTION:
                        return update(newState, {
                            blocks: {
                                [spriteId]: {
                                    [rootId]: {
                                        children: {
                                            [id]: {
                                                action: updatedAction
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    default:
                        return update(newState, {
                            blocks: {
                                [spriteId]: {
                                    [rootId]: {
                                        children: {
                                            [id]: {
                                                action: updatedAction
                                            }
                                        }
                                    }
                                }
                            }
                        });
                }
            }
        case "DELETE":
            // if (action.payload.idx === 0) {
            //     return update(newState,
            //         {
            //             blocks: {
            //                 [spriteId]: {
            //                     $splice: [[
            //                         action.payload.idx, 1
            //                     ]],
            //                 },
            //             },
            //         },
            //     );
            // } else {
                return update(newState, {
                    blocks: {
                        [spriteId]: {
                            [action.payload.rootIdx]: {
                                children: {
                                    $splice: [[
                                        action.payload.idx
                                    ]]
                                }
                            },
                        },
                    },
                });
            // }
        case "CLICK_PLAY":
            localStorage.setItem("b", JSON.stringify(state.blocks));
            return state;
        // case "ADD_SPRITE":
        //     const newSprite = getNewSprite();
        //     newSprite.id = action.payload.spriteId;
        //     return update(newState, {
        //         sprite: {
        //             [newSprite.id]: { $set: newSprite },
        //         },
        //         blocks: {
        //             [newSprite.id]: {
        //                 $set: [getDefaultNewBlock()]
        //             }
        //         }
        //     });
        // case "REMOVE_SPRITE":
        //     return update(newState, {
        //         sprite: {
        //             $unset: [action.payload.id],
        //         }
        //     });
        // case "SELECT_SPRITE":
        //     return update(newState, {
        //         spriteId: {
        //             $set: action.payload.id,
        //         }
        //     });
        default:
            return state;
    }
}

