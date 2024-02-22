import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';

export const SpriteWiget = memo(() => {
    const dispatch = useDispatch();
    const blocksIdx = useSelector((state) => {
        return []
        // ||state.dnd.blocks.map((parentBlock) => {
        //   const isParentPlay = parentBlock.children[0]?.action.name === PLAY;
        //   return parentBlock.children.map((childBlock, j) => isParentPlay ? j : null);
        // });
      });
    //   console.log(blocksIdx,' blocksIdx ');
    const startMove = () => {
      // blocksIdx.forEach((block, rootIdx)=>{
      //   block.forEach(idx => {
      //     if(idx !== null){
      //       dispatch({
      //         type: "CLICK_PLAY",
      //         payload: { idx, rootIdx },
      //       });
      //     }
      //   })
      // });
    }
    function undo() {
      dispatch(ActionCreators.undo({ reducerName: 'sprite' })) // undo the last action
    }
    function redo() {
      dispatch(ActionCreators.redo({ reducerName: 'sprite'  })) // undo the last action
    }
  return (
    <div className="flex flex-row whitespace-nowrap absolute border border-black border-solid border-1" >
        <button className="position-absolute p-3" onClick={startMove}> Play </button>
        <button className="position-absolute p-3" onClick={undo}> Undo </button>
        <button className="position-absolute p-3" onClick={redo}> Redo </button>
      </div>
  )
});
