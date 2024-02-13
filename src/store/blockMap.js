
import update from 'immutability-helper';
import { memoize } from 'lodash';

export const blockMapReducer = ((state = {
    1:
        [1,
            [2
                // ,
                // [
                //     3,
                //     [4]
                // ]
            ]
        ],
    5:
        [5,
            [6
                // ,
                // [
                //     8,
                //     [9]
                // ]
            ]
        ]
}, action) => {
    switch (action.type) {
        case "DELETE_ITEM_FROM_CONTAINER":
            var { dragged:{uId, rootId} } = action.payload;
            var newState = { ...state };
            if(!rootId) {
                console.log(uId,' uId');
                Object.keys(newState).forEach(r =>{
                    if(r != uId) {
                        const flatBlock = flattenArray(newState[r]);
                        // console.log('newState[r] :', newState[r]);
                        // console.log('flatBlock :', flatBlock);
                        const newBlock = _.reject(flatBlock, value => value === uId);
                        // console.log('newBlock :', newBlock);
                        newState[r] = convertToNestedArray(newBlock);
                    }
                });
            }
                return newState;
        case "MOVE_IN_CONTAINER":
            var newState = { ...state };
            var { dragged, dropped, uId } = action.payload;
            if (!dragged.hasOwnProperty("rootId")) {
                if (dropped.hasOwnProperty("rootId")) {
                    const newSubBlock = flattenArray(newState[dropped.rootId]);
                    const idx = newSubBlock.indexOf(uId);
                    // console.log(idx,' idx ', uId, dropped.index, newSubBlock, dragged.uId);

                    // when dragged at same index as before
                    if(idx == dropped.index) {
                        return state;
                    }

                    // remove item when dragged already exists at some position
                    if(idx != -1) {
                        newSubBlock.splice(idx, 1);
                    }
                    // console.log(newSubBlock,' newSubBlock');
                    // add block at index
                    newSubBlock.splice(dropped.index, 0, uId);

                    const nestedBlock = convertToNestedArray(newSubBlock);
                    newState[dropped.rootId] = nestedBlock;
                    
                    // if(nestedBlock[0] == dropped.rootId) {
                    //     newState[dropped.rootId] = nestedBlock;
                    // } else {
                    //     delete newState[dropped.rootId];
                    //     newState[nestedBlock[0]] = nestedBlock;
                    // }
                    console.log(newSubBlock,' newSubBlock ', nestedBlock, newState, " dropped.rootId ", dropped.rootId);
                }
            } else {
                const { dragged, dropped } = action.payload;
                const draggedBlocks = flattenArray(newState?.[dragged.rootId] || []);
                const draggedItems = draggedBlocks.splice(dragged.index);

                // // console.log(newState, ' newState ', dragged.rootId, newState[dragged.rootId]);

                if (draggedBlocks.length == 0) {
                    delete newState[dragged.id];
                } else {
                    newState[dragged.rootId] = convertToNestedArray(draggedBlocks);
                }
                // // console.log('draggedBlock :', draggedBlock, idxDragged, dragged.id);
                const droppedBlocks = flattenArray(newState[dropped.rootId]);

                droppedBlocks.splice(dropped.index, 0, draggedItems);
                newState[dropped.rootId] = convertToNestedArray(flattenArray(droppedBlocks));
                // // console.log('droppedBlock :',flattenArray(droppedBlock));
                // // console.log(action.payload,' action.payload skkk ');
            }

            return newState;
        case "MOVE_TO_MID":
            var { dragged: { rootId, index, id, uId }  } = action.payload;
            if (!rootId) {
                // // console.log(newState,' newState shivam');
                // let newState = { ...state };
                // Object.keys(newState).forEach(r =>{
                //     if(r != uId) {
                //         const flatBlock = flattenArray(newState[r]);
                //         // console.log('newState[r] :', newState[r]);
                //         // console.log('flatBlock :', flatBlock);
                //         const newBlock = _.reject(flatBlock, value => value === uId);
                //         // console.log('newBlock :', newBlock);
                //         newState[r] = convertToNestedArray(newBlock);
                //     }
                // });
                // newState[uId] = [uId];
                return {
                    ...state,
                    [uId]: [uId],
                };
            } else if (index !== 0) {
                const darggedRootData = flattenArray(state[rootId]);
                const draggedBlockIndex = darggedRootData.indexOf(id);
                const draggedBlocks = darggedRootData.splice(draggedBlockIndex);

                return {
                    ...state,
                    [rootId]: convertToNestedArray(darggedRootData),
                    [id]: convertToNestedArray(draggedBlocks),
                }
            }
            return state;
        case "ADD_BLOCK":
            var { id } = action.payload.dragged;
            return {
                ...state,
                [id]: [id],
            };
        case "MOVE_BLOCK":
            var { dragged: { id, index, rootId }, position } = action.payload;
            // var initialPosition = getBlockRootPositio(rootId, state.blocks);
            if (rootId !== id) {
                const [newBlock, originalBlock] = customLogicToFindBlock([...state[rootId]], id);
                const newData = {
                    ...state,
                    [id]: (newBlock),
                };
                if (originalBlock) {
                    newData[rootId] = originalBlock;
                }
                return newData;
            }
            return state;
        case "DELETE_BLOCK":
            var { dragged: { rootId, index, id, uId } } = action.payload;
            var newState = { ...state };
            if(!rootId) {
                Object.keys(newState).forEach(r =>{
                    const flatBlock = flattenArray(newState[r]);
                    const newBlock = _.reject(flatBlock, value => value === uId);
                    newState[r] = convertToNestedArray(newBlock);
                })
            } else {if( index == 0 ) {
                delete newState[rootId];
            } else {
                const draggedBlocks = newState[rootId];
                const flatDraggedBlocks = flattenArray(draggedBlocks);
                const draggedIndex = flatDraggedBlocks.indexOf(id);
                draggedBlocks.splice(draggedIndex);
                return update(state, {
                    [rootId]: {
                        $set: convertToNestedArray(draggedBlocks),
                    }
                });
            }}
            return newState;
        default:
            return state;
    }
})
const flattenArray = memoize((arr) => {
    return [...arr].reduce((flat, current) => {
        return flat.concat(Array.isArray(current) ? flattenArray(current) : current);
    }, []);
}); // Empty dependency array


const convertToNestedArray = memoize((arr) => {
    if (arr.length === 1) {
        return [arr[0]];
    } else {
        return [arr[0], convertToNestedArray(arr.slice(1))];
    }
}); // Empty dependency array

// Now you can use convertToNestedArray in your component


function json(r) {
    return JSON.parse(JSON.stringify(r))
}
function customLogicToFindBlock(x, id, index) {
    // var x =[1,[2,[3,[4]]]];
    // var id = 3;
    var ans = null;
    var ans2 = "";
    var count = 0;
    // for(var i=0; i<index; i++){
    while (true) {
        var [m, n] = x;
        if (m == id) {
            ans = x;
            break;
        } else {
            if (count != 0) {
                ans2 = ans2.concat(",")
            }
            ans2 = ans2.concat("[", m);
            // if(n.length == 2) {ans2 = ans2.concat}
            x = n;
            count++;
        }
    }
    while (count > 0) {
        ans2 = ans2 + "]";
        count--;
    }
    // // console.log(JSON.stringify(ans), (ans2));
    return [ans, ans2 && JSON.parse(ans2)];
}
