import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragBlock from "./DragBlock";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { uniqueId } from "lodash";

const styles = {
  transform: "rotate(0deg)",
};

export default function MidArea() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const blocksCount = useSelector((state) => {
    return state.blocks.length;
  });
  const [, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    hover(item, monitor) { },
    drop(item, monitor) {
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      const payload = {
        dropped: item,
        position: {
          initialPosition: monitor.getInitialSourceClientOffset(),
          finalPosition: monitor.getSourceClientOffset()
        }
      };
      dispatch({ type: "MOVE_TO_MID", payload });
    },
  }));
  drop(ref);
  return <div ref={ref} className="midarea h-full w-full" style={styles}>
    <div className="font-bold"> {"Midarea"} </div>
    {new Array(blocksCount).fill(0).map((id, idx) => (<DragBlock idx={(idx)} key={idx} />))}
  </div>;
};