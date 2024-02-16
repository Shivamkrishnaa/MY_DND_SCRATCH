import update from 'immutability-helper';

const globalSubstring = "g_";
const parseNumber = (value) => isNaN(Number(value)) ? 0 : Number(value);
const getNumber = (value) => isNaN(Number(value)) ? 0 : Number(value).toString();
const getNegativeNumber = (value) => isNaN(Number(value)) ? 0 : `-${Number(Math.abs(value)).toString()}`;

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
const defaultHeight = 100.04156036376953;
const defaultWidth = 95.17898101806641;
export function previewReducer(state = {
    sprite: {
        top: 20,
        left: 80,
        rotate: 0,
        transition: '',
        display: "block",
        width: defaultWidth,
        height: defaultHeight,
        transform: 1,
        bubble: {
            text: false,
            type: "say",
            time: 0,
        }
    }
}, action = { payload: {} }) {
    switch (action.type) {
        case "SPRITE_MOVE":
            return update(state, {
                sprite: {
                    $merge: {
                        left: state.sprite.left + action.payload.delta.x,
                        top: state.sprite.top + action.payload.delta.y,
                    }
                }
            });
        case "PLAY":
            const blocks = JSON.parse(localStorage.getItem("b"));
            const { idx, rootIdx } = action.payload;
            const { name, value } = action.payload.action ? action.payload.action : blocks[rootIdx].children[idx].action;
            switch (name) {
                case MOVE:
                    return update(state, {
                        sprite: {
                            $merge: {
                                left: (parseNumber(state.sprite.left) + parseNumber(value)),
                            },
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
                // break;
                case ROTATE_CLOCKWISE:
                    return update(state, {
                        sprite: {
                            $merge: {
                                rotate: parseNumber(state.sprite.rotate) + parseNumber(value),
                            },
                        },
                    });
                case ROTATE_ANTICLOCKWISE:
                    return update(state, {
                        sprite: {
                            $merge: {
                                rotate: parseNumber(state.sprite.rotate) - Math.abs(parseNumber(value)),
                            },
                        },
                    });
                case "GO_TO_COORDINATES":
                    return update(state, {
                        sprite: {
                            $merge: {
                                left: parseNumber(value[0]),
                                top: parseNumber(value[1]),
                            },
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: Number(r.action.value[0]), top: Number(r.action.value[1]) }));
                // break;
                case "GLIDE_TO_COORDINATES":
                    return update(state, {
                        sprite: {
                            $merge: {
                                transition: `all ${value[0]}s ease-in-out`,
                                left: parseNumber(value[1]),
                                top: parseNumber(value[2]),
                            },
                        }
                    });
                // setSprite(sprite => ({ ...sprite,  }));
                // break;
                case "POINT_IN_DIRECTION":
                    return update(state, {
                        sprite: {
                            $merge: {
                                rotate: parseNumber(value),
                            },
                        }
                    });
                case "CHANGE_X_BY":
                    return update(state, {
                        sprite: {
                            $merge: {
                                left: (state.sprite.left + parseNumber(value)),
                            },
                        }
                    });
                // setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
                // break;
                case "CHANGE_Y_BY":
                    return update(state, {
                        sprite: {
                            $merge: {
                                left: (state.sprite.top + parseNumber(value)),
                            },
                        }
                    });
                // setSprite(sprite => ({ ...sprite, top: (sprite.top + Number(r.action.value)) }));
                // break;
                case "SET_X_TO":
                    return update(state, {
                        sprite: {
                            $merge: {
                                left: parseNumber(value),
                            },
                        },
                    });
                // setSprite(sprite => ({ ...sprite, left: r.action.value }));
                // break;
                case "SET_Y_TO":
                    return update(state, {
                        sprite: {
                            $merge: {
                                top: parseNumber(value),
                            },
                        }
                    });
                    // setSprite(sprite => ({ ...sprite, top: r.action.value }));
                    break;
                case CHANGE_SIZE_BY:
                    return update(state, {
                        sprite: {
                            $merge: {
                                height: (state.sprite.height +
                                    // getNumber(value) +
                                    defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                ),
                                width: (state.sprite.width +
                                    // getNumber(value) +
                                    defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                ),
                                transform: (state.sprite.transform +
                                    // getNumber(value) +
                                    (isNaN(Number(value)) ? 1 : Number(value))
                                ),
                            },
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
                    return update(state, {
                        sprite: {
                            $merge: {
                                height: (
                                    // state.sprite.height +
                                    // getNumber(value) +
                                    defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                ) / 100,
                                width: (
                                    // state.sprite.width +
                                    // getNumber(value) +
                                    defaultHeight * (isNaN(Number(value)) ? 1 : Number(value))
                                ) / 100,
                                transform: (
                                    // state.sprite.transform +
                                    // getNumber(value) +
                                    (isNaN(Number(value)) ? 1 : Number(value))
                                ) / 100,
                            },
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
                    return update(state, {
                        sprite: {
                            $merge: {
                                display: "none",
                            },
                        },
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     display: "none",
                // }));
                // break;
                case SHOW_SVG:

                    return update(state, {
                        sprite: {
                            $merge: {
                                display: "block",
                            },
                        }
                    });
                // setSpriteSvg(spriteSvg => ({
                //     ...spriteSvg,
                //     display: "block",
                // }));
                // break;
                case THINK_BUBBLE:
                    // clearTimers(timerIds)  
                    return update(state, {
                        sprite: {
                            bubble: {
                                $merge: {
                                    think: "think",
                                    text: value,
                                }
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
                    return update(state, {
                        sprite: {
                            bubble: {
                                $merge: {
                                    think: "say",
                                    text: value,
                                },
                            },
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
                    //     update(state, {
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

                    return update(state, {
                        sprite: {
                            bubble: {
                                $merge: {
                                    think: "think",
                                    text: value[0],
                                    time: value[1],
                                },
                            },
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
                    return update(state, {
                        sprite: {
                            bubble: {
                                $merge: {
                                    think: "say",
                                    text: value[0],
                                    time: value[1],
                                },
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
                    return update(state, {
                        sprite: {
                            bubble: {
                                $merge: {
                                    think: "say",
                                    text: "",
                                    time: 0,
                                },
                            },
                        }
                    });
                // break;
            };
        default:
            return state;
    }
}

