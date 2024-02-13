import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';
import { Block } from './Block';

const styleId = "block-style";
const checkIsTop = (hoverBoundingRect, clientOffset) => {
  // Determine rectangle on screen
  // const hoverBoundingRect = ref.current?.getBoundingClientRect();
  // const clientOffset = monitor.getClientOffset();
  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  // Determine mouse position
  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%
  // Dragging downwards
  var addToTop = true;
  if (
    // dragIndex < hoverIndex && 
    hoverClientY < hoverMiddleY) {
    addToTop = true;
    // // console.log("Add on top");
    // return;
  }
  // Dragging upwards
  if (
    // dragIndex > hoverIndex && 
    hoverClientY > hoverMiddleY) {
    // // console.log("Add on below");
    addToTop = false;
    // return;
  }
  return addToTop;
}
export const DragDropContainer = ({ idx, rootIdx }) => {
  const { id, action, type } = useSelector((state) => {
    return state.midBlocks.blocks?.[rootIdx]?.children?.[idx] || {};
  });
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent, clientOffset }, drop] = useDrop(
    () => ({
      accept: ItemTypes.MOTION,
      drop(item, monitor) {
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
        const payload = {
          dragged: item, // item which is dragged
          dropped: { idx, rootIdx },
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


      // dispatch({
      // type: "MOVE_BLOCK", payload: {
      //     dragged: {
      //       id,
      //       index,
      //       rootId,
      //     },
      //     position: { delta: monitor.getDifferenceFromInitialOffset() }
      //   }
      // });
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
      // Cleanup when the component unmounts
      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [isDragging, rootIdx, idx]);

  let className = `item-${rootIdx}-${idx}`;
  if (isOver) {
    const isOnTop = checkIsTop(ref.current?.getBoundingClientRect(), clientOffset);
    className += isOnTop ? " pt-10 bg-blue-500 " : " pb-10 bg-blue-500 "
  }
  return (<div className={className} ref={ref}>
    {JSON.stringify(clientOffset)}
    <Block idx={idx} rootId={rootIdx} id={id} action={action} />
  </div>);
}
