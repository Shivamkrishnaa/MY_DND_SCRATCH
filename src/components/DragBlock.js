import React from 'react';
import { useSelector } from 'react-redux';
import { BlocksContainer } from './BlockContainer';



const DragBlock = ({ idx }) => {
  const { top, left } = useSelector((state) => {
    return state.blocks?.[idx]?.position || {};
  });
  return (
    <div className="absolute" style={{ top: `calc(${top}px - ${2}rem)`, left: `calc(${left}px - ${15}rem)` }}>
      <div className='flex flex-col flex-wrap'>
        <BlocksContainer idx={idx} />
      </div>
    </div>
  );
}

export default DragBlock;
