export const blocksReducer = (state = {
    blocks: {
        1: { id: 1, type: "MOTION", action: "Move 10 steps"},
        2: { id: 2, type: "MOTION", action: "Move 20 steps"},
    }
}, action) => {
    switch (action.type) {
        case "value":
            return state;
        default:
            return state;
    }
}