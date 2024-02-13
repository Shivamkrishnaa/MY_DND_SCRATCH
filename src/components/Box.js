import React from 'react';
import { useSelector } from 'react-redux';
import { BlocksContainer } from './BlockContainer';



export const Box = ({ idx }) => {
  const { top, left } = useSelector((state) => {
    return state.midBlocks?.blocks?.[idx]?.position || {};
  });

  return (
    <div className={`absolute top-${top} left-${left} `} style={{ left }}>
      <div className='flex flex-col flex-wrap px-3 py-1 '>
        <BlocksContainer idx={idx} />
      </div>
    </div>
  );
}
