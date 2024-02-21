import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';
import { Block } from './Block';
import { checkIsHoveringAbove } from '../store/block';

const styleId = "block-style";
export const DragDropContainer = memo(({ idx, rootIdx }) => {
  const { id, action, type } = useSelector((state) => {
    return state.dnd.blocks?.[rootIdx]?.children?.[idx] || {};
  });
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isOver, clientOffset }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BLOCK,
      drop(item, monitor) {
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
        const payload = {
          dragged: item, // item which is dragged
          dropped: { idx, rootIdx },
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
      }),
    }),
    [],
  )
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { idx, rootIdx },
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
    className += isOnTop ? " pt-10 bg-blue-500 " : " pb-10 bg-blue-500 "
  }
  return (<span className={className} ref={ref}>
    <Block rootId={rootIdx} id={idx} action={action} />
  </span>);
})
