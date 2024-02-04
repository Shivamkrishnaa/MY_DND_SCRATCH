export function blockMapReducer(state = {
    1: [1, [2,[1,[2]]]]
}, action) {
    switch (action.type) {
        case "value":
            return state;
        default:
            return state;
    }
}