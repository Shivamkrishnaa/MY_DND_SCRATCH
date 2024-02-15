import React, { memo, useCallback, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import CatSprite from "./CatSprite";
import { ItemTypes } from "../utils";
import { SpriteDragDropContainer } from './SpriteDragDropContainer';
import { useSelector } from "react-redux";
import { CHANGE_SIZE, CHANGE_SIZE_BY, HIDE_SVG, SHOW_SVG } from "../store/block";
import ThoughtBubble from "./Bubble/ThoughBubble";
const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  // position: "absolute",
};

const defaultHeight =  100.04156036376953;
const defaultWidth =  95.17898101806641;
 function PreviewArea() {
  const ref = useRef(null);
  // const [center, setCenter] = useEffect({ x: 0, y: 0 });
  const [sprite, setSprite] = useState(
    { id: 1, top: 20, left: 80, title: 'Drag me around', rotate: 0, transition: '' }
  );
  const blocks = useSelector((state) => {
    const actions = [];
    state.blocks.forEach(block => {
      actions.push(block.children);
    });
    return actions.flat();
  });
  const [spriteSvg, setSpriteSvg] = useState({
    width: defaultWidth,
    height: defaultHeight,
    transform: 1,
  });
  const moveBox = useCallback(
    (id, left, top) => {
      setSprite(
        update(sprite, {
          $merge: { left, top },
        }),
      )
    },
    [sprite, setSprite],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.SPRITE,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top);
        return undefined;
      }
    }), [moveBox]);
  const startMove = () => {
    blocks.forEach(r => {
      switch (r.action.name) {
        case "MOVE":
          setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
          break;
        case "ROTATE_CLOCKWISE":
          setSprite(sprite => ({ ...sprite, rotate: (sprite.rotate + Number(r.action.value)) }));
          break;
        case "ROTATE_ANTICLOCKWISE":
          setSprite(sprite => ({ ...sprite, rotate: (sprite.rotate + Number(r.action.value)) }));
          break;
        case "GO_TO_COORDINATES":
          setSprite(sprite => ({ ...sprite, left: Number(r.action.value[0]), top: Number(r.action.value[1]) }));
          break;
        case "GLIDE_TO_COORDINATES":
          setSprite(sprite => ({ ...sprite, transition: `all ${r.action.value[0]}s ease-in-out`, left: Number(r.action.value[1]), top: Number(r.action.value[2]) }));
          break;
        case "POINT_IN_DIRECTION":
          setSprite(sprite => ({ ...sprite, rotate: r.action.value }));
          break;
        case "CHANGE_X_BY":
          setSprite(sprite => ({ ...sprite, left: (sprite.left + Number(r.action.value)) }));
          break;
        case "CHANGE_Y_BY":
          setSprite(sprite => ({ ...sprite, top: (sprite.top + Number(r.action.value)) }));
          break;
        case "SET_X_TO":
          setSprite(sprite => ({ ...sprite, left: r.action.value }));
          break;
        case "SET_Y_TO":
          setSprite(sprite => ({ ...sprite, top: r.action.value }));
          break;
        case CHANGE_SIZE_BY: 
          setSpriteSvg(spriteSvg => ({ ...spriteSvg, 
            height: spriteSvg.height + defaultHeight*(isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)),
            width: spriteSvg.width + defaultWidth*(isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)),
            transform: (spriteSvg.transform + (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value))),
          }));
          break;
        case CHANGE_SIZE: 
          setSpriteSvg(spriteSvg => ({ ...spriteSvg, 
            height: (defaultHeight*(isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)))/100,
            width: (defaultWidth*(isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)))/100,
            transform: (isNaN(Number(r.action.value)) ? 1 : Number(r.action.value)/100),
          }));
          break;
        case HIDE_SVG: 
          setSpriteSvg(spriteSvg => ({ ...spriteSvg, 
            display: "none",
          }));
          break;
        case SHOW_SVG: 
          setSpriteSvg(spriteSvg => ({ ...spriteSvg, 
            display: "block",
          }));
          break;
        case "Move 20 steps":
          setSprite(sprite => ({ ...sprite, top: sprite.top, left: sprite.left + 20 }));
          break;
      }
    });
  }
  drop(ref);
  return (
    <div style={{ transform: "rotate(0deg)" }} className="flex-none w-full h-full p-2">
      <button style={{ position: "absolute" }} className="position-absolute p-3" onClick={startMove}> Play </button>
      <div ref={ref} style={styles}>
        <SpriteDragDropContainer display={spriteSvg.display} transition={sprite.transition} sprite={sprite} id={sprite.id} rotate={(sprite.rotate + "deg")} top={`calc(50% - 7rem + ${sprite.top}px)`} left={`calc(50% - 7rem + ${sprite.left}px)`} title={sprite.title}>
        <ThoughtBubble>
        ThoughtBubbleThoughtBubbleThoughtBubbleThoughtBubble
          </ThoughtBubble>
        <CatSprite height={spriteSvg.height} width={spriteSvg.width} transform={spriteSvg.transform} />
        </SpriteDragDropContainer>
      </div>
    </div>
  );
}
export default memo(PreviewArea);