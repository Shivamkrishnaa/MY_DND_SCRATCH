import update from 'immutability-helper';
import { uniqueId } from "lodash";
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

export function midBlockReducer(state = {
    blocks:
        [
            {
                position: { top: 120, left: 300 },
                children: [{
                    id: uniqueId(),
                    type: "Motion",
                    action: "Move 10 steps"
                }, {
                    id: uniqueId(),
                    type: "Motion",
                    action: "Move 20 steps"
                }, {
                    id: uniqueId(),
                    type: "Motion",
                    action: "Move 10 steps"
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
                                    left: position.finalPosition.x-position.initialPosition.x,
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
                                top: Math.abs(position.finalPosition.y)-15,
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
                                $splice: !addAfterItemIdx ? [[dropped.idx + 1, 0, {...dragged }]] : [[dropped.idx, 0, {...dragged}]],
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
                                $splice: !addAfterItemIdx ? [[dropped.idx + 1, 0, ...children ]] : [[dropped.idx, 0, ...children ]],
                            }
                        }
                    }
                })
            }

            return state;
        default:
            return state;
    }
}

