import React, { memo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "./Box";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { uniqueId } from "lodash";

const getCorrectDroppedOffsetValue = (initialPosition, finalPosition) => {
  // get the container (view port) position by react ref...
  const dropTargetPosition = ref.current.getBoundingClientRect();

  const { y: finalY, x: finalX } = finalPosition;
  const { y: initialY, x: initialX } = initialPosition;

  // calculate the correct position removing the viewport position.
  // finalY > initialY, I'm dragging down, otherwise, dragging up
  const newYposition =
    finalY > initialY
      ? initialY + (finalY - initialY) - dropTargetPosition.top
      : initialY - (initialY - finalY) - dropTargetPosition.top;

  const newXposition =
    finalX > initialX
      ? initialX + (finalX - initialX) - dropTargetPosition.left
      : initialX - (initialX - finalX) - dropTargetPosition.left;

  return {
    x: newXposition,
    y: newYposition,
  };
};
const styles = {
};
var c = 0;
const MidArea = memo(() => {
  const ref = useRef();
  const dispatch = useDispatch();
  const memoizedDispatch = useCallback((action) => {
    dispatch(action);
  }, [dispatch]);

  const blocks = useSelector((state) => {
    return state.blocksCoordinates.blocks;
  });
  
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    hover(item, monitor) {
      
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      // console.error("SHIVAMMMMM", item)

      // remove the item which is geeting gragged
      // if(c >= 3) {
      //   return;
      // }
      // c++;
      // const position = {
      //   delta: monitor.getDifferenceFromInitialOffset(),
      //   initialPosition: monitor.getInitialSourceClientOffset(),
      //   finalPosition: monitor.getSourceClientOffset(),
      //   didDrop: monitor.didDrop(),
      // };
      if(monitor.isOver()) {
        console.log("is over ")
        memoizedDispatch({
          type: "DELETE_ITEM_FROM_CONTAINER",
          payload: {
            dragged: item
          },
        });
      }
    },
    drop(item, monitor) {

      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      // console.error('MidArea : useDrop :');
      // console.log('dragged :', item);
      // console.log('monitor.isOver():', monitor?.isOver?.());
      // console.log('monitor.didDrop():', monitor?.didDrop?.());
      // console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
      // console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
      // console.log('monitor.getSourceClientOffset():', monitor?.getSourceClientOffset?.());

      // console.error('"ADD_BLOCK" :', "ADD_BLOCK");

      const position = {
        delta: monitor.getDifferenceFromInitialOffset(),
        initialPosition: monitor.getInitialSourceClientOffset(),
        finalPosition: monitor.getSourceClientOffset(),
        didDrop: monitor.didDrop(),
      };
      memoizedDispatch({
        type: "MOVE_TO_MID",
        payload: {
          dragged: item,
          position,
          uId: item.uId
        },
      });

      // // console.log(monitor.isOver(), monitor.didDrop());
      // if(monitor.isOver() && monitor.didDrop()) {
      //   const uId = uniqueId("ms");
      // }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: !true }),
    }),
  }));
  return <div ref={drop} className="midarea h-full w-full" style={styles}>
      <div className="font-bold"> {"Midarea"} </div>
          {Object.keys(blocks).map((id, index) => (<Box id={id} key={index} />))}
    </div>;
},[]);
export default MidArea;