import React, { memo } from 'react';
import { DragDropContainer } from './DragDropContainer';
import { Block } from './Block';
import { useSelector } from 'react-redux';

export const BlocksContainer = memo(({ idx: rootIdx }) => {
  const childrensCount = useSelector((state) => {
    return state.midBlocks.blocks?.[rootIdx]?.children?.length || 0;
  });
  if (!childrensCount) return <></>
  return new Array(childrensCount).fill(childrensCount).map((id, idx) => {
    return <DragDropContainer key={idx} rootIdx={rootIdx} idx={idx} />
  });
});