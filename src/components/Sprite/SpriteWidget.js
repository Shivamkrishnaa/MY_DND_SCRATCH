import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { PLAY } from '../../store/block';
import { useBlockEvents } from '../../hooks/useBlock';

export const SpriteWidget = memo(() => {
  const dispatch = useDispatch();
  const { triggerEvent } = useBlockEvents({ dispatch });

  const sprites = useSelector((state) => {
    const result = [];
    Object.entries(state.dnd.blocks).forEach(([spriteId, blocks]) => {
      blocks.forEach(block => {
        if(block.children[0]?.action.name === PLAY) {
          block.spriteId = spriteId;
          result.push(block);
        }
      });
    });
    return result;
  });
  const startMove = () => {
    sprites.forEach((blocks, rootIdx) => {
      blocks.children.forEach((block) => {
        block.selectedSpriteId = blocks.spriteId;
        triggerEvent(block);
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
    <div className="flex flex-row whitespace-nowrap pt-3 position-absolute pl-3 text-sm">
      <button className="border-r pr-2" onClick={startMove}>
        Play
      </button>
      <button className="border-r px-2" onClick={undo}>
        Undo
      </button>
      <button className="px-2" onClick={redo}>
        Redo
      </button>
    </div>
  )
});

export default SpriteWidget;