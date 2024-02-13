export function blockMapReducer(state = {
    1:
        [1,
            [2,
                [
                    3,
                    [4]
                ]
            ]
        ],
    5:
        [6,
            [7,
                [
                    8,
                    [9]
                ]
            ]
        ]
}, action) {
    switch (action.type) {
        default:
            return state;
    }
}
