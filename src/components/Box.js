import React from 'react';
import { useSelector } from 'react-redux';
import { BlocksContainer } from './BlockContainer';

const style = {
  position: 'absolute',
  padding: '0.5rem 1rem',
};

export const Box = ({ id }) => {
  const [coordinates, blockMap ] = useSelector((state) => {
    return [state.blocksCoordinates.blocks[id], state.blocksMap[id]];
  });
  if(!blockMap) return (<></>);
  return (
    <div style={{ ...style, ...coordinates }}>
      <div className='flex flex-row flex-wrap px-3 py-1 '>
          <BlocksContainer items={blockMap} index={0} rootId={id}/>
      </div>
    </div>
  );
}
