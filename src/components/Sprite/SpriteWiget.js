import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { PLAY } from '../../store/block';

export const SpriteWiget = memo(() => {
  const dispatch = useDispatch();
  const blocksIdx = useSelector((state) => {
    return Object.entries(state.dnd.blocks).reduce((result, [id, blocks]) => {
      const spriteContainsPlay = blocks.some((block) => block.children[0]?.action.name === PLAY);

      if (spriteContainsPlay) {
        result[id] = blocks.map((parentBlock, rootIdx) => {
          const isParentPlay = parentBlock.children[0]?.action.name === PLAY;
          return isParentPlay ? parentBlock.children.map((childBlock, j) => (j !== 0 ? j : null)) : null;
        });
      }

      return result;
    }, {});
  });
  const startMove = () => {
    Object.entries(blocksIdx).forEach(([id, value]) => {
      value.forEach((block, rootIdx) => {
        block.forEach((idx) => {
          if (idx !== null) {
            dispatch({
              type: "CLICK_PLAY",
              payload: { idx, rootIdx, id },
            });
          }
        });
      });
    });
  };
  function undo() {
    dispatch(ActionCreators.undo({ reducerName: 'sprite' })) // undo the last action
  }
  function redo() {
    dispatch(ActionCreators.redo({ reducerName: 'sprite' })) // undo the last action
  }
  return (
    <div className="flex flex-row whitespace-nowrap absolute">
      <button className="position-absolute p-2 text-sm mb-1" onClick={startMove}>
        Play
      </button>
      <button className="position-absolute p-2 text-sm mb-1" onClick={undo}>
        Undo
      </button>
      <button className="position-absolute p-2 text-sm mb-1" onClick={redo}>
        Redo
      </button>
    </div>
  )
});
