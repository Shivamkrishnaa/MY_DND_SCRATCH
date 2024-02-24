import React, { useRef } from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../../utils';
import BlocksContainer from './BlocksContainer';

export const BlockDropContainer = () => {

  const ref = useRef(null);
  const dispatch = useDispatch();
  const [blocksCount, spriteId] = useSelector((state) => {
    const selectedSpriteId = state.preview.present.selectedSpriteId;
    return [state.dnd.blocks?.[selectedSpriteId]?.length || 0, selectedSpriteId];
  });
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop(item, monitor) {
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      if(!spriteId) {alert("Add a sprite first.");return;}
      const payload = {
        spriteId,
        dropped: item,
        position: {
          initialPosition: monitor.getInitialSourceClientOffset(),
          finalPosition: monitor.getSourceClientOffset()
        }
      };
      dispatch({ type: "MOVE_TO_MID", payload });
    },
  }),[spriteId]);
  drop(ref);
  return (
    <div ref={ref} className="h-full w-full box transform rotate-0" >
      <div className="flex flex-row items-start justify-between p-2" >
        <div className="grow font-bold text-lg mb-4"> {"Midarea"} </div>
      </div>
      {new Array(blocksCount).fill(0).map((id, idx) => (<BlocksContainer idx={(idx)} key={idx} />))}
  </div>
  )
}
