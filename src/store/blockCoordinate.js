export const blocksCoordinatesReducer = (state = { blocks: {
    1: {  id: 1, top: 20, left: 80 },
    2: {  id: 2, top: 180, left: 20 },
} }, action) => {
    switch (action.type) {
        case "value":
            return state;
        default:
            return state;
    }
}