import update from 'immutability-helper';
import { defaultHeight, defaultSpriteData, defaultWidth, getNewSprite, initialSprite } from './block';
import { cloneDeep } from 'lodash';

const parseNumber = (value) => isNaN(Number(value)) ? 0 : Number(value);

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
export function previewReducer(state = {
    sprite: { 
        // [initialSprite.id]: cloneDeep(initialSprite) 
    },
    selectedSpriteId: null,
    // initialSprite.id,
    // initialSprite.id,
}, action = { payload: {} }) {
    let newState = state;
    let selectedSpriteId = state.selectedSpriteId;
    switch (action.type) {
        case "SPRITE_MOVE":
            return update(newState, {
                selectedSpriteId: {
                    $set: action.payload.spriteId
                },
                sprite: {
                    [action.payload.spriteId]: {
                        $merge: {
                            left: newState.sprite[action.payload.spriteId].left + action.payload.delta.x,
                            top: newState.sprite[action.payload.spriteId].top + action.payload.delta.y,
                            transition: defaultSpriteData.transition,
                        }
                    }
                }
            });
        case "REMOVE_SPRITE":
            if(selectedSpriteId === action.payload.id) {
                const filteredArray = newState.selectedSpriteId = Object.keys(newState.sprite)
                .filter(r=>r !== action.payload.id)
                
                newState.selectedSpriteId =  filteredArray[filteredArray.length - 1] || null;
            }
            return update(newState, {
                sprite: {
                    $unset: [action.payload.id],
                }
            });
        case "ADD_SPRITE":
            const newSprite = getNewSprite();
            return update(newState, {
                selectedSpriteId: {$set: newSprite.id,},
                sprite: {
                    [newSprite.id]: {
                        $set: newSprite
                    },
                },
            });
        case "SELECT_SPRITE":
            return update(state, {
                selectedSpriteId: {
                    $set: action.payload.spriteId,
                },
            });
        case "CLICK_PLAY":
            const blocks = JSON.parse(localStorage.getItem("b"));
            const { idx, rootIdx, id } = action.payload;
            const { name, value, type } = action.payload.action ? action.payload.action : blocks[id][rootIdx].children[idx].action;
            if (!newState.sprite.hasOwnProperty(id)) {
                newState = update(newState, {
                    sprite: {
                        [id]: {
                            $set: {
                                ...cloneDeep(defaultSpriteData),
                            },
                        },
                    },
                });
            }

            switch (name) {
                case MOVE:
                    return update(newState, {
                        sprite: {
                            [id]: {
                                $merge: {
                                    left: (parseNumber(newState.sprite[id].left) + parseNumber(value)),
                                },
                            }
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
                // break;
                case ROTATE_CLOCKWISE:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    rotate: parseNumber(newState.sprite[action.payload.id].rotate) + parseNumber(value),
                                },
                            },
                        }
                    });
                case ROTATE_ANTICLOCKWISE:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    rotate: parseNumber(newState.sprite[action.payload.id].rotate) - Math.abs(parseNumber(value)),
                                },
                            }
                        },
                    });
                case "GO_TO_COORDINATES":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    left: parseNumber(value[0]),
                                    top: parseNumber(value[1]),
                                },
                            }
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: Number(r.action.value[0]), top: Number(r.action.value[1]) }));
                // break;
                case "GLIDE_TO_COORDINATES":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    transition: `all ${value[0]}s ease-in-out`,
                                    left: parseNumber(value[1]),
                                    top: parseNumber(value[2]),
                                },
                            }
                        }
                    });
                // setSprite(sprite => ({ ...sprite,  }));
                // break;
                case "POINT_IN_DIRECTION":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    rotate: parseNumber(value),
                                },
                            }
                        }
                    });
                case "CHANGE_X_BY":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    left: (newState.sprite[action.payload.id].left + parseNumber(value)),
                                },
                            }
                        }
                    });
                // setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
                // break;
                case "CHANGE_Y_BY":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    top: (newState.sprite[action.payload.id].top + parseNumber(value)),
                                },
                            }
                        }
                    });
                // setSprite(sprite => ({ ...sprite, top: (sprite.top + Number(r.action.value)) }));
                // break;
                case "SET_X_TO":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    left: parseNumber(value),
                                },
                            }
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: r.action.value }));
                // break;
                case "SET_Y_TO":
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    top: parseNumber(value),
                                },
                            }
                        }
                    });
                    // setSprite(sprite => ({ ...sprite, top: r.action.value }));
                    break;
                case CHANGE_SIZE_BY:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    height: (newState.sprite[action.payload.id].height +
                                        // getNumber(value) +
                                        defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                    ),
                                    width: (newState.sprite[action.payload.id].width +
                                        // getNumber(value) +
                                        defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                    ),
                                    transform: (newState.sprite[action.payload.id].transform +
                                        // getNumber(value) +
                                        (isNaN(Number(value)) ? 1 : Number(value))
                                    ),
                                },
                            }
                        },
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     height: spriteSvg.height + defaultHeight * (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)),
                //     width: spriteSvg.width + defaultWidth * (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)),
                //     transform: (spriteSvg.transform + (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value))),
                // }));
                // break;
                case CHANGE_SIZE:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    height: (
                                        // newState.sprite[action.payload.id].height +
                                        // getNumber(value) +
                                        defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                    ) / 100,
                                    width: (
                                        // newState.sprite[action.payload.id].width +
                                        // getNumber(value) +
                                        defaultWidth * (isNaN(Number(value)) ? 1 : Number(value))
                                    ) / 100,
                                    transform: (
                                        // newState.sprite[action.payload.id].transform +
                                        // getNumber(value) +
                                        (isNaN(Number(value)) ? 1 : Number(value))
                                    ) / 100,
                                },
                            }
                        },
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     height: (defaultHeight * (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value))) / 100,
                //     width: (defaultWidth * (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value))) / 100,
                //     transform: (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value) / 100),
                // }));
                // break;
                case HIDE_SVG:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    display: "none",
                                },
                            }
                        },
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     display: "none",
                // }));
                // break;
                case SHOW_SVG:

                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                $merge: {
                                    display: "block",
                                },
                            }
                        }
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     display: "block",
                // }));
                // break;
                case THINK_BUBBLE:
                    // clearTimers(timerIds)  
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                bubble: {
                                    $merge: {
                                        type,
                                        text: value,
                                    }
                                },
                            }
                        }
                    });
                    // setSpriteSvg(spriteSvg => ({
                    //     ...spriteSvg,
                    //     bubble: {
                    //         think: "think",
                    //         text: r.action.value,
                    //     },
                    // }));
                    ;
                    break;
                case SAY_BUBBLE:
                    // clearTimers(timerIds)  
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                bubble: {
                                    $merge: {
                                        type,
                                        text: value,
                                    },
                                },
                            }
                        }
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     bubble: {
                //         think: "say",
                //         text: r.action.value,
                //     }
                // }));
                // clearTimers(timerIds);
                // break;
                case THINK_BUBBLE_FOR:
                    // timerIds.push(setTimeout(() => {
                    //     // dispatch
                    //     update(newState, {
                    //         sprite: {
                    //             style: {
                    //                 svg: {
                    //                     bubble: {
                    //                         $merge: {
                    //                             think: "say",
                    //                             text: "",
                    //                             time: 0,
                    //                         }

                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     });
                    //     // setSpriteSvg(spriteSvg => ({ ...spriteSvg, bubble: { ...spriteSvg.bubble, text: "", time: 0 } }))
                    // }, value[1] * 1000));

                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                bubble: {
                                    $merge: {
                                        type,
                                        text: value[0],
                                        time: value[1],
                                    },
                                },
                            }
                        }
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     bubble: {
                //         think: "think",
                //         text: r.action.value[0],
                //         time: r.action.value[1],
                //     },
                // }));
                // timerIds.push(setTimeout(() => {
                //     setSpriteSvg(spriteSvg => ({ ...spriteSvg, bubble: { ...spriteSvg.bubble, text: "", time: 0 } }))
                // }, r.action.value[1] * 1000));
                // break;
                case SAY_BUBBLE_FOR:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                bubble: {
                                    $merge: {
                                        type,
                                        text: value[0],
                                        time: value[1],
                                    },
                                }
                            }
                        }
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     bubble: {
                //         think: "say",
                //         text: r.action.value[0],
                //         time: r.action.value[1]
                //     }
                // }));
                // timerIds.push(setTimeout(() => {
                //     setSpriteSvg(spriteSvg => ({ ...spriteSvg, bubble: { ...spriteSvg.bubble, text: "", time: 0 } }))
                // }, r.action.value[1] * 1000));
                // break;

                default:
                    return update(newState, {
                        sprite: {
                            [action.payload.id]: {
                                bubble: {
                                    $merge: {
                                        think: "say",
                                        text: "",
                                        time: 0,
                                    },
                                },
                            }
                        }
                    });
                // break;
            };
        default:
            return newState;
    }
}

