import update from 'immutability-helper';
import { uniqueId } from "lodash";
const isGlobalBlock = (block) => !block.hasOwnProperty("rootIdx") && !block.hasOwnProperty("idx");
function findIndices(blocks, desiredId) {
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        for (let j = 0; j < block.children.length; j++) {
            const child = block.children[j];

            if (child.id === desiredId) {
                // Condition met, return the indices i and j
                return { i, j };
            }
        }
    }

    // Return null if the id is not found in the nested structure
    return null;
}
export function midBlockReducer(state = {
    blocks:
        [
            {
                position: { top: 20, left: 100 },
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
            // {
            //     position: { top: 30, left: 40 },
            //     children: [{
            //         type: "Motion",
            //         action: "Move 40 steps"
            //     }, {
            //         type: "Motion",
            //         action: "Move 50 steps"
            //     }, {
            //         type: "Motion",
            //         action: "Move 60 steps"
            //     }],
            // }
        ]
}
    , action) {
    switch (action.type) {
        case "MOVE_TO_MID":
            let { dropped } = action.payload;
            if (isGlobalBlock(dropped)) {
                return update(state, {
                    blocks: {
                        $push: [
                            {
                                position: { top: 500, left: 500 },
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
                const newState = JSON.parse(JSON.stringify(state));
                const children = newState.blocks[dropped.rootIdx].children.splice(dropped.idx);
                if (newState.blocks[dropped.rootIdx].children.length == 0) {
                    newState.blocks.splice(dropped.rootIdx, 1);
                }
                return update(newState, {
                    blocks: {
                        $push: [{
                            position: {
                                top: 500,
                                left: 500,
                            },
                            children,
                        }]
                    }
                })
            }
        default:
            return state;
    }
}