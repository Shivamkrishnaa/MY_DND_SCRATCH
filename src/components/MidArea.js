import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "./Box";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { uniqueId } from "lodash";
import { useForkRef } from "rooks";
// import useForkRef from "@rooks/use-fork-ref"

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
  transform: "rotate(0deg)",
};

export default function MidArea() {
  const ref = useRef();
  const dispatch = useDispatch();
  const blocks = useSelector((state) => {
    return state.blocksCoordinates.blocks;
  });
  
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    drop(dragged, monitor) {
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      console.error('MidArea : useDrop :');
      console.log('dragged :', dragged);
      console.log('monitor.isOver():', monitor?.isOver?.());
      console.log('monitor.didDrop():', monitor?.didDrop?.());
      console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
      console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());

      console.error('"ADD_BLOCK" :', "ADD_BLOCK");

      // console.log(monitor.isOver(), monitor.didDrop());
      // if(monitor.isOver() && monitor.didDrop()) {
      //   dragged.id = uniqueId("ms");
      //   const position = {
      //     delta: monitor.getDifferenceFromInitialOffset(),
      //     initialPosition: monitor.getInitialSourceClientOffset(),
      //     finalPosition: monitor.getSourceClientOffset(),
      //     didDrop: monitor.didDrop(),
      //   };
      //   dispatch({
      //     type: "ADD_BLOCK",
      //     payload: {
      //       dragged,
      //       position,
      //     },
      //   });
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
};