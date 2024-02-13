import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "./Box";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { uniqueId } from "lodash";

const styles = {
  transform: "rotate(0deg)",
};

export default function MidArea() {
  const dispatch = useDispatch();
  const blocksCount = useSelector((state) => {
    return state.midBlocks.blocks.length;
  });
  const [, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    hover(item, monitor) { },
    drop(item, monitor) {
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      const payload = {
        dropped: item,
      };
      dispatch({ type: "MOVE_TO_MID", payload });

    },
  }));
  return <div ref={drop} className="midarea h-full w-full" style={styles}>
    <div className="font-bold"> {"Midarea"} </div>
    {new Array(blocksCount).fill(0).map((id, idx) => (<Box idx={(idx)} key={idx} />))}
  </div>;
};