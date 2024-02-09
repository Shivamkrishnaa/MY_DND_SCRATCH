import update from 'immutability-helper';
import { uniqueId } from 'lodash';

// function checkIsGlobalBlock(id) {
//     return id < 10;
// }
export const blocksCoordinatesReducer = (state = {
    blocks: {
        1: { id: 1, top: 20, left: 200+80 },
        5: { id: 5, top: 40, left: 200+460 },
    }
}, action) => {
    switch (action.type) {
        case "ADD_IN_CONTAINER":
            // root block to root block
            var { dragged, dropped } = action.payload;
            var isDraggedRoot = dragged.id == dragged.rootId;
            var isDroppedRoot = dropped.id == dropped.rootId;
            console.log(isDraggedRoot, isDroppedRoot);
            // if (isDraggedRoot && isDroppedRoot) {
            //     return update(state, {
            //         blocks: {
            //             $unset: [dropped.id]
            //         },
            //     });
            // }
            return {
                ...state,
            };
        case "ADD_BLOCK":
            var { position: { didDrop }, dragged: { id, index } } = action.payload;
            console.log(didDrop && index === undefined, didDrop, index);
            var { top, left } = getCorrectCoordinates(action.payload);
            if (!didDrop && index === undefined) { // item is dropped from sidebar
                return {
                    ...state,
                    blocks: {
                        ...state.blocks,
                        [id]: { id, top, left },
                    },
                };
            }
        case "MOVE_BLOCK":
            var { dragged: { id, index, rootId }, position } = action.payload;
            var isDraggedToDndContainer = position?.delta?.hasOwnProperty("x") && position?.delta?.hasOwnProperty("y");
            if (!isDraggedToDndContainer) { // simply move blocks
                var initialPosition = getBlockRootPosition(rootId, state.blocks);
                var { top, left } = addDelta(initialPosition, position);
                if (rootId === id) {
                    return {
                        ...state,
                        blocks: {
                            ...state.blocks,
                            [id]: { id, top, left },
                        },
                    };
                } else {
                    return update(state, {
                        blocks: {
                            $merge: { [id]: { id, top, left } },
                        }
                    });
                }
            }
        // else if(id == rootId) {
        //      return update(state, {
        //         blocks: {
        //             $unset: [id]
        //         }
        //       });

        // }
        default:
            return state;
    }
};

function getBlockRootPosition(rootId, blocks) {
    return blocks[rootId];
}
function addDelta({ left, top }, { delta: { x, y } }) {
    return {
        left: Math.round((left ?? 0) + (x ?? 0)),
        top: Math.round((top ?? 0) + (y ?? 0)),
    };
}
function getCorrectCoordinates(data) {
    console.log(data);
    return { left: 20, top: 40 } || data.position.delta;
}


const getCorrectDroppedOffsetValue = (initialPosition, finalPosition) => {
    // get the container (view port) position by react ref...
    const dropTargetPosition = ref.current.getBoundingClientRect();

    const { y: finalY, x: finalX } = finalPosition;
    const { y: initialY, x: initialX } = initialPosition;

    // calculate the correct position removing the viewport position.
    // finalY > initialY, I'm dragging down, otherwise, dragging up
    const newYposition =
        finalY > initialY
            ? initialY + (finalY - initialY) - dropTargetPosition.top
            : initialY - (initialY - finalY) - dropTargetPosition.top;

    const newXposition =
        finalX > initialX
            ? initialX + (finalX - initialX) - dropTargetPosition.left
            : initialX - (initialX - finalX) - dropTargetPosition.left;

    return {
        x: newXposition,
        y: newYposition,
    };
};