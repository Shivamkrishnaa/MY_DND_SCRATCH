import React, { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragBlock from "./DragBlock";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { ActionCreators } from 'redux-undo';

const styles = {
  transform: "rotate(0deg)",
};

function MidArea() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const blocksCount = useSelector((state) => {
    return state.dnd.blocks.length;
  });
  const [, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
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
  
  return <div ref={ref} className="m-2 midarea h-full w-full" style={styles}>
      <div className="flex flex-row items-start justify-between p-2" >
        <div className="grow font-bold"> {"Midarea"} </div>
      </div>
      {new Array(blocksCount).fill(0).map((id, idx) => (<DragBlock idx={(idx)} key={idx} />))}
  </div>;
};
export default memo(MidArea);