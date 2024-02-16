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
  function undo() {
    dispatch(ActionCreators.undo({ reducerName: 'dnd' })) // undo the last action
  }
  function redo() {
    dispatch(ActionCreators.redo({ reducerName: 'dnd'  })) // undo the last action
  }
  return <div ref={ref} className="m-2 midarea h-full w-full" style={styles}>
      <div className="flex flex-row items-start justify-between p-2" >
        <div className="grow font-bold"> {"Midarea"} </div>
        <div className="flex-none grow-0 w-14 border border-black border-solid border-1">
          <button className="p-2" onClick={undo}>Undo</button>
          <button className="p-2" onClick={redo}>Redo</button>
        </div>
      </div>
      {new Array(blocksCount).fill(0).map((id, idx) => (<DragBlock idx={(idx)} key={idx} />))}
  </div>;
};
export default memo(MidArea);