import React from 'react'
import { useSelector } from 'react-redux';
import { Block } from './Block';

export const BlockContainer = ({ rootIdx, idx }) => {
    const action = useSelector((state) => {
        const selectedSpriteId = state.preview.present.selectedSpriteId;
        return state.dnd.blocks[selectedSpriteId]?.[rootIdx]?.children?.[idx].action || {};
      });
  return (
    <Block action={action} rootId={rootIdx} id={idx}/>
  )
}
export default BlockContainer;