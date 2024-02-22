import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import BlockDragDropContainer from './BlockDragDropContainer';

const BlockList = ({ idx: rootIdx }) => {
  const childrensCount = useSelector((state) => {
    const selectedSpriteId = state.dnd.selectedSpriteId;
    return state.dnd.blocks[selectedSpriteId]?.[rootIdx]?.children?.length || 0;
  });
  if (!childrensCount) return <></>
  return new Array(childrensCount).fill(childrensCount).map((id, idx) => {
    return <BlockDragDropContainer key={idx} rootIdx={rootIdx} idx={idx} />
  });
};

export default BlockList;