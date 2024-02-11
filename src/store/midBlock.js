export function midBlockReducer(state = [
    {
        position: { top: 20, left: 100 }, children: [{
            type: "Motion",
            action: "Move 10 steps"
        }, {
            type: "Motion",
            action: "Move 20 steps"
        }, {
            type: "Motion",
            action: "Move 10 steps"
        }],
    },
    {
        position: { top: 30, left: 40 }, children: [{
            type: "Motion",
            action: "Move 40 steps"
        }, {
            type: "Motion",
            action: "Move 50 steps"
        }, {
            type: "Motion",
            action: "Move 60 steps"
        }],
    }
], action) {
    switch (action.type) {
        case "value":
            return state;
        default:
            return state;
    }
}