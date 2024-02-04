import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from './Container'
import { Block } from './Block'

const style = {
  position: 'absolute',
  padding: '0.5rem 1rem',
}

function Primer(items) {
  const [id, item] = items;
  if(!items) {
    return <></>
  }
  if (Array.isArray(item)) {
    return (<Container>
      <Block id={id}>
        {Primer(item)}
      </Block>
    </Container>);
  } else {
    return (<Container><Block id={id} /></Container>);
  }
}
export const Box = ({ id }) => {
  const { top, left } = useSelector((state) => {
    return state.blocksCoordinates.blocks[id];
  });
  const map = { 1: [1, [2,[1,[2]]]] };
  return (
    <div style={{ ...style, left, top }}>
      {Object.values(map).map(item => <div className='flex flex-row flex-wrap px-3 py-1 '>
          {Primer(item)}
          </div>)}
    </div>
  );
}
