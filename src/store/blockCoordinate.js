import update from 'immutability-helper';

export const blocksCoordinatesReducer = (state = {
    blocks: {
        1: { id: 1, top: 20, left: 200 + 80 },
        5: { id: 5, top: 340, left: 200 },
    }
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};