import React, { memo, useCallback, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../utils';
import { uniqueId } from 'lodash';

var c = 0;
export const DragDropContainer = memo(({ children, type = ItemTypes.MOTION, id, index, rootId }) => {
  // // console.log(id, index, ' id, index ');
  const { left, top } = useSelector((state) => {
    // // console.log(state.blocksCoordinates.blocks[rootId], id);
    return state.blocksCoordinates.blocks[rootId] || {};
  });
  const dispatch = useDispatch();
  const memoizedDispatch = useCallback((action) => {
    dispatch(action);
  }, [dispatch]);

  const ref = useRef(null);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.MOTION,
      hover(item, monitor) {
        // // console.log(item,' item ');
        if (!ref.current) {
          return;
        }
          // const dragIndex = item.index;
          // const hoverIndex = index;
          // // Don't replace items with themselves
          
          if(item.rootId && item.rootId === rootId && item.index == index) {
            return;
          } else if(!item.rootId && item.uId == item.id) {
            return;
          }

          // if(c == 3) {
          //   // console.log(1);
          //   return;
          // } 
          // c++;
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
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
          // Time to actually perform the action
          // // console.log(dragIndex, hoverIndex);
          // if( item.rootId !== rootId) {
            const payload = {
              dragged: item, // item which is dragged
              dropped: { id, index: !addToTop ? index + 1 : index , rootId },
              uId: item.uId,// item on which is dropped
            };
            memoizedDispatch({ type: "MOVE_IN_CONTAINER", payload });
            // // console.log({ type: "MOVE_IN_CONTAINER", payload });
          // }
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          // item.index = hoverIndex;
      },
      drop(item, monitor) {
        // // console.log("shivam ----------------*___*--------------")
        if (!monitor.didDrop()) {
        }
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
       
        // // console.error('chote boxes jispe drop krna hai: useDrop : drop');
        // // console.log('item :', item);
        // // console.log('scope item :', {id, index, rootId});
        // // console.log('monitor.isOver(), :', monitor?.isOver());
        // // console.log('monitor.didDrop() :', monitor?.didDrop());
        // // console.log('monitor.getDifferenceFromInitialOffset() :', monitor?.getDifferenceFromInitialOffset());
        // // console.log('monitor.getInitialSourceClientOffset() :', monitor?.getInitialSourceClientOffset());
        // // console.log('monitor.getDropResult() :', monitor?.getDropResult());
        // // console.error(' "chote boxes" :',  "ADD_IN_CONTAINER");
        // if( item.rootId !== rootId) {
        //   const payload = {
        //     dragged: item, // item which is dragged
        //     dropped: { id, index, rootId },
        //     uId: uniqueId("b_"),// item on which is dropped
        //   };
        //   dispatch({ type: "MOVE_IN_CONTAINER", payload });
        // }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: !true }),
      }),
    }),
    [id, index, rootId ],
  )
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: { left, top, id, index, rootId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
  }),
    end: (item, monitor) => {
      // // console.log('shivam ');
      if(!monitor.didDrop()) {
        dispatch({
            type: "DELETE_BLOCK",
            payload: {
                dragged: item,
            },
        });
      }
      // // console.error('andar vala container jisko uthaya : useDrag : end');
      // // console.log('item :', item);
      // // console.log('scope item :',{ id, index, rootId });
      // // console.log('monitor.isOver():', monitor?.isOver?.());
      // // console.log('monitor.didDrop():', monitor?.didDrop?.());
      // // console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
      // // console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
      // // console.error(' "anda vala container" :',  "MOVE_BLOCK");

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
  }), [left, top, id, index, rootId ]);
  drag(drop((ref)));
  let backgroundColor = 'rgba(0, 0, 0, .2)'
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }
  // return collected.isDragging ? (
  //   <div ref={dragPreview} />
  // ) : 
  
  return (<div style={{ color: "white", backgroundColor,
  
  display: isDragging ? "none" : "block",
  
  }} ref={ref} >
      <span>INDEX:{index} rootId:{rootId} id: {id}</span>
    {children}
    </div>);
}
)