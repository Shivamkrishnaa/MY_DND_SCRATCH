import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';
import { Block } from './Block';
import { PLAY, checkIsHoveringAbove } from '../store/block';

const styleId = "block-style";
export const DragDropContainer = memo(({ idx, rootIdx }) => {
  const { id, action, type } = useSelector((state) => {
    return state.dnd.blocks?.[rootIdx]?.children?.[idx] || {};
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
          dragged: item, // item which is dragged
          dropped: { idx, rootIdx },
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
    }),
    [],
  )
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { idx, rootIdx, action },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const payload = {
          idx, rootIdx
        };
        dispatch({ type: "DELETE", payload });
      }

    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }), []);

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

  let className = `item-${rootIdx}-${idx}`;
  if (isOver) {
    const isOnTop = checkIsHoveringAbove({ hoverBoundingRect: ref.current?.getBoundingClientRect(), clientOffset });
    isOnTopRef.current = isOnTop;
    className += isOnTop ? " pt-10 bg-blue-500 " : " pb-10 bg-blue-500 "
    // check to play item only on top
    console.log('item?.action?.name :', 
    item?.action?.name=== action.name,
    action.name === PLAY);
    if (
      (item?.action?.name=== action.name && action.name === PLAY) || 
      (item?.action?.name === PLAY && ((idx !== 0 ) || (idx === 0 && !isOnTop))) || 
      (item?.action?.name !== PLAY && action.name === PLAY && isOnTop)
      ) {
      className = "";
      isOnTopRef.current = null;
    }
  }
  console.log(canDrop,' canDrop ');
  return (<span className={className} ref={ref}>
    <Block rootId={rootIdx} id={idx} action={action} />
  </span>);
})
