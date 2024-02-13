import React from 'react';
import { useSelector } from 'react-redux';
import { BlocksContainer } from './BlockContainer';



export const Box = ({ idx }) => {
  const { top, left } = useSelector((state) => {
    return state.midBlocks?.blocks?.[idx]?.position || {};
  });

  return (
    <div className="absolute" style={{ top: `calc(${top}px - ${2}rem)`, left: `calc(${left}px - ${15}rem)` }}>
      <div className='flex flex-col flex-wrap px-3 py-1 '>
        <BlocksContainer idx={idx} />
      </div>
    </div>
  );
}
