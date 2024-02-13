import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { BlocksContainer } from './BlockContainer';

const style = {
  position: 'absolute',
  // padding: '0.5rem 1rem',
};

export const Box = memo(({ id }) => {
  // // console.log(id,' id ');
  const [{ left, top }, blockMap ] = useSelector((state) => {
    // // console.log(state,' state ');
    return [state.blocksCoordinates?.blocks?.[id]||{}, state.blocksMap[id]];
  });
  if(!blockMap) return (<></>);
  return (
    <div style={{ ...style, 
      left: `${left}px`, 
      top: ` ${top}px`
    }}>
      <div className='flex flex-row flex-wrap px-3 py-1 '>
          <BlocksContainer items={blockMap} index={0} rootId={id}/>
      </div>
    </div>
  );
})
