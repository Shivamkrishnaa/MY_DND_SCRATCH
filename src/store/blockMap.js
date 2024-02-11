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
        case "MOVE_IN_CONAINER":
            const newState = {...state};
            const { dragged, dropped } = action.payload;
            if(!dragged.hasOwnProperty("rootId")) {
                if(dropped.hasOwnProperty("rootId")) {
                    const newSubBlock = newState[dropped.rootId];
                    console.log(newSubBlock,' newSubBlock ');
                }
            }
            console.log(action.payload,' action.payload ');

            return newState;
        case "ADD_IN_CONTAINER":
            return { ...state };
        case "ADD_BLOCK":
            var { id } = action.payload.dragged;
            return {
                ...state,
                [id]: [id],
            };
        case "MOVE_BLOCK":
            var { dragged: { id, index, rootId }, position } = action.payload;
            // var initialPosition = getBlockRootPositio(rootId, state.blocks);
            if(rootId !== id) {
                const [ newBlock, originalBlock ] = customLogicToFindBlock([...state[rootId]], id);
                const newData = {
                    ...state,
                    [id]: (newBlock),
                };
                if(originalBlock) {
                    newData[rootId] = originalBlock;
                }
                return newData;
            } 
            return state;
        default:
            return state;
    }
}


function json(r){
    return JSON.parse(JSON.stringify(r))
    }
    function customLogicToFindBlock(x, id, index){
        // var x =[1,[2,[3,[4]]]];
        // var id = 3;
        var ans = null;
        var ans2 = "";
        var count = 0;
        // for(var i=0; i<index; i++){
            while(true){
            var [m,n] = x;
            if(m == id){
                ans = x;
                break;
            } else {
                if(count != 0) {
                    ans2 = ans2.concat(",")
                }
                ans2 = ans2.concat("[",m);
                // if(n.length == 2) {ans2 = ans2.concat}
                x = n;
                count++;
            }
        }
        while(count>0){
            ans2 = ans2+"]";
            count--;
        }
        // console.log(JSON.stringify(ans), (ans2));
        return [ans, ans2 && JSON.parse(ans2)];
        }