import React, { memo, useCallback, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import CatSprite from "./CatSprite";
import { ItemTypes } from "../utils";
import { SpriteDragDropContainer } from './SpriteDragDropContainer';
import { useDispatch, useSelector } from "react-redux";
// import { CHANGE_SIZE, CHANGE_SIZE_BY, HIDE_SVG, SAY_BUBBLE, SAY_BUBBLE_FOR, SHOW_SVG, THINK_BUBBLE, THINK_BUBBLE_FOR } from "../store/block";
import { BubbleContainer } from "./Bubble/BubbleContainer";
import { ActionCreators } from "redux-undo";
import { PLAY } from "../store/block";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  // position: "absolute",
};

 function PreviewArea() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const blocksIdx = useSelector((state)=>{
    console.log(state,' state ');
    const blocks = [];
    state.dnd.blocks.forEach((r,i)=>{
      const block = [];
      var isParentPlay = r.children[0].action.name === PLAY;
      r.children.forEach((r, j)=>{
        block.push(isParentPlay ? j : null);
      });
      blocks.push(block);
    });
    return blocks;
  });
  
  
  // const blocks = useSelector((state) => {
  //   const actions = [];
  //   state.dnd.blocks.forEach(block => {
  //     actions.push(block.children);
  //   });
  //   return actions.flat();
  // });

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.SPRITE,
      drop(item, monitor) {
        dispatch({ type: "SPRITE_MOVE", payload: { 
          delta: monitor.getDifferenceFromInitialOffset()} });
        return undefined;
      }
    }), []);
  // function clearTimers(timerIds){
  //   while (timerIds.length) {
  //     clearTimeout(timerIds.pop());
  //   }
  // }
  const startMove = () => {
    blocksIdx.forEach((block, rootIdx)=>{
      block.forEach(idx => {
        if(idx !== null){
          dispatch({
            type: "CLICK_PLAY",
            payload: { idx, rootIdx },
          });
        }
      })
    });
  }
  drop(ref);
  function undo() {
    dispatch(ActionCreators.undo({ reducerName: 'sprite' })) // undo the last action
  }
  function redo() {
    dispatch(ActionCreators.redo({ reducerName: 'sprite'  })) // undo the last action
  }
  return (
    <div style={{ transform: "rotate(0deg)" }} className="flex-none w-full h-full p-2">
      <div className="flex flex-row whitespace-nowrap absolute border border-black border-solid border-1" >
        <button className="position-absolute p-3" onClick={startMove}> Play </button>
        <button className="position-absolute p-3" onClick={undo}> Undo </button>
        <button className="position-absolute p-3" onClick={redo}> Redo </button>
      </div>
      <div ref={ref} style={styles}>
        <SpriteDragDropContainer 

        // display={spriteSvg.c} 
        // transition={sprite.transition} 
        // sprite={sprite} id={sprite.id} 
        // rotate={(sprite.rotate + "deg")} 
        // top={`calc(50% - 7rem + ${sprite.top}px)`} 
        // left={`calc(50% - 7rem + ${sprite.left}px)`} 
        // title={sprite.title}
        >
          <CatSprite />
        </SpriteDragDropContainer>
      <BubbleContainer 
      // text={spriteSvg.bubble.text} 
      // type={spriteSvg.bubble.type} 
      // top={`calc(50% - 15rem + ${sprite.top}px)`}

      // left={`calc(50% - 14.5rem + ${sprite.left}px + ${spriteSvg.width}px)`} 
      />
      {/* <BubbleTimeContainer handleChange={()=>setSpriteSvg(spriteSvg=>({ ...spriteSvg, bubble: { ...spriteSvg.bubble, time: 0 }}))} time={spriteSvg.bubble.time} text={spriteSvg.bubble.text} type={spriteSvg.bubble.type} top={`calc(50% - 15rem + ${sprite.top}px)`} left={`calc(50% - 14.5rem + ${sprite.left}px + ${spriteSvg.width}px)`} /> */}
      </div>
    </div>
  );
}
export default memo(PreviewArea);