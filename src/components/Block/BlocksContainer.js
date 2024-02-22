import React from 'react';
import { useSelector } from 'react-redux';
import BlockList from './BlockList';


const BlocksContainer = ({ idx }) => {
  const { top, left } = useSelector((state) => {
    const selectedSpriteId = state.dnd.selectedSpriteId;
    return state.dnd.blocks[selectedSpriteId]?.[idx]?.position || {};
  });
  return (
    <div className="absolute" style={{ top: `calc(${top}px - ${2}rem)`, left: `calc(${left}px - ${15}rem)` }}>
      <div className='flex flex-col flex-wrap'>
        <BlockList idx={idx} />
      </div>
    </div>
  );
}

export default BlocksContainer;
