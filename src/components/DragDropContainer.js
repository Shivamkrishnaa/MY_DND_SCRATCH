import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';

export const DragDropContainer = ({ children, type = ItemTypes.MOTION, id, index, rootId }) => {
  // console.log(id, index, ' id, index ');
  const { left, top } = useSelector((state) => {
    // console.log(state.blocksCoordinates.blocks[rootId], id);
    return state.blocksCoordinates.blocks[rootId] || {};
  });
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.MOTION,
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        //   const dragIndex = item.index;
        //   const hoverIndex = index;
        //   // Don't replace items with themselves
        //   if (dragIndex === hoverIndex) {
        //     return;
        //   }
        //   // Determine rectangle on screen
        //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
        //   // Get vertical middle
        //   const hoverMiddleY =
        //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        //   // Determine mouse position
        //   const clientOffset = monitor.getClientOffset();
        //   // Get pixels to the top
        //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //   // Only perform the move when the mouse has crossed half of the items height
        //   // When dragging downwards, only move when the cursor is below 50%
        //   // When dragging upwards, only move when the cursor is above 50%
        //   // Dragging downwards
        //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //     return;
        //   }
        //   // Dragging upwards
        //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //     return;
        //   }
        //   // Time to actually perform the action
        //   moveCard(dragIndex, hoverIndex);
        //   // Note: we're mutating the monitor item here!
        //   // Generally it's better to avoid mutations,
        //   // but it's good here for the sake of performance
        //   // to avoid expensive index searches.
        //   item.index = hoverIndex;
      },
      drop(item, monitor) {
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
       
        console.error('chote boxes jispe drop krna hai: useDrop : drop');
        console.log('item :', item);
        console.log('scope item :', {id, index, rootId});
        console.log('monitor.isOver(), :', monitor?.isOver());
        console.log('monitor.didDrop() :', monitor?.didDrop());
        console.log('monitor.getDifferenceFromInitialOffset() :', monitor?.getDifferenceFromInitialOffset());
        console.log('monitor.getInitialSourceClientOffset() :', monitor?.getInitialSourceClientOffset());
        console.log('monitor.getDropResult() :', monitor?.getDropResult());
        console.error(' "chote boxes" :',  "ADD_IN_CONTAINER");
        
      const didDrop = monitor.didDrop()
        if (didDrop) {
          return;
        }
        const payload = {
          dragged: item, // item which is dragged
          dropped: { id, index, rootId },
          uId: uniqueId("b_"),// item on which is dropped
        };
        dispatch({ type: "MOVE_IN_CONAINER", payload });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: !true }),
      }),
    }),
    [],
  )
  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { left, top, id, index, rootId },
    end: (item, monitor) => {
       
      console.error('andar vala container jisko uthaya : useDrag : end');
      console.log('item :', item);
      console.log('scope item :',{ id, index, rootId });
      console.log('monitor.isOver():', monitor?.isOver?.());
      console.log('monitor.didDrop():', monitor?.didDrop?.());
      console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
      console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
      console.error(' "anda vala container" :',  "MOVE_BLOCK");

      // dispatch({
      // type: "MOVE_BLOCK", payload: {
      //     dragged: {
      //       id,
      //       index,
      //       rootId,
      //     },
      //     position: { delta: monitor.getDifferenceFromInitialOffset(),}
      //   }
      // });
    }
  }), [left, top, id, index, rootId, isOver, isOverCurrent]);
  drag(drop((ref)));
  let backgroundColor = 'rgba(0, 0, 0, .2)'
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (<div style={{ color: "white", backgroundColor }} ref={ref} >{children}</div>);
}
