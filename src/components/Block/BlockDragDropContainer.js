import React, { memo, useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../../utils';
import { PLAY, checkIsHoveringAbove } from '../../store/block';
import BlockContainer from './BlockContainer';

const styleId = "block-style";
const BlockDragDropContainer = memo(({ idx, rootIdx }) => {
  const spriteId = useSelector((state) => {
    return state.preview.present.selectedSpriteId;
  });
  const action = useSelector((state) => {
    const selectedSpriteId = state.preview.present.selectedSpriteId;
    return state.dnd.blocks[selectedSpriteId]?.[rootIdx]?.children?.[idx].action
  });
  const ref = useRef(null);
  const isOnTopRef = useRef(false);
  const dispatch = useDispatch();
  const [{ isOver, clientOffset, item, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BLOCK,
      drop(item, monitor) {
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
        if(isOnTopRef.current === null) return;
        const payload = {
          spriteId,
          dragged: item, // item which is dragged
          dropped: { idx, rootIdx, action },
          addAfterItemIdx: isOnTopRef.current,
          position: {
            initialPosition: monitor.getInitialSourceClientOffset(),
            finalPosition: monitor.getSourceClientOffset(),
            hoverBoundingRect: ref.current?.getBoundingClientRect(),
            clientOffset: monitor.getClientOffset(),
          },
        };
        dispatch({ type: "MOVE_IN_CONTAINER", payload });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: !true }),
        clientOffset: monitor.getClientOffset(),
        item: monitor.getItem(),
      }),
    }),[idx, rootIdx, isOnTopRef.current]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: { idx, rootIdx, action },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const payload = {
          idx, rootIdx,
          spriteId,
        };
        dispatch({ type: "DELETE", payload });
      }

    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }), [idx, rootIdx, action]);

  drag(drop((ref)));


  useEffect(() => {
    document?.getElementById(styleId)?.remove();
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    if (isDragging) {
      // Dynamically add CSS to the <head> element
      const className = `item-${rootIdx}-${idx}`;
      styleTag.innerHTML = `
              .${className} {
                display: none;
              }
              .${className} ~ * {
                display: none;
              }
       `;
      document.head.insertAdjacentElement('beforeend', styleTag);
    }
  }, [isDragging, rootIdx, idx]);

  let className = `item-${rootIdx}-${idx}  first:pt-1 last:pt-1`;
  
  if (isOver) {
    const isOnTop = checkIsHoveringAbove({ hoverBoundingRect: ref.current?.getBoundingClientRect(), clientOffset });
    isOnTopRef.current = isOnTop;
    className += isOnTop ? " pt-8 bg-gray-300 " : " pb-8 bg-gray-300 "
    if (
      (item?.action?.name=== action.name && action.name === PLAY) ||
      (item?.action?.name === PLAY && ((idx !== 0 ) || (idx === 0 && !isOnTop))) || 
      (item?.action?.name !== PLAY && action.name === PLAY && isOnTop)
      ) {
      className = "";
      isOnTopRef.current = null;
    }
  }

return (<span className={className} ref={ref}>
    <BlockContainer rootIdx={rootIdx} idx={idx} />
  </span>);
})

export default BlockDragDropContainer;