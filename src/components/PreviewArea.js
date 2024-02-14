import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import CatSprite from "./CatSprite";
import { ItemTypes } from "../utils";
import { SpriteDragDropContainer } from './SpriteDragDropContainer';
import { useSelector } from "react-redux";
import { toNumber } from "lodash";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  position: "relative",
};

export default function PreviewArea() {
  const ref = useRef(null);
  const [center, setCenter] = useEffect({ x: 0, y: 0 });
  const [sprite, setSprite] = useState(
    { id: 1, top: 20, left: 80, title: 'Drag me around', rotate: 0 }
  );
  const blocks = useSelector((state)=>{
    const actions = [];
    state.blocks.forEach(block=> {
      actions.push(block.children);
    });
    return actions.flat();
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
    blocks.forEach(r=>{
      switch (r.action.name) {
        case "MOVE":
          setSprite(sprite => ({ ...sprite, left: (sprite.left+Number(r.action.value)) }));
          break;
        case "ROTATE_CLOCKWISE":
          setSprite(sprite => ({ ...sprite, rotate: (sprite.rotate+Number(r.action.value)) }));
          break;
        case "ROTATE_ANTICLOCKWISE":
          setSprite(sprite => ({ ...sprite, rotate: (sprite.rotate+Number(r.action.value)) }));
          break;
        case "Move 20 steps":
          setSprite(sprite => ({ ...sprite, top: sprite.top, left: sprite.left+20 }));
          break;
      }
      
    });
  }
  drop(ref);
  useEffect(() => {
    const calculateCenter = () => {
      const box = ref.current;
      if (box) {
        const rect = box.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setCenter({ x: centerX, y: centerY });
      }
    };
    calculateCenter();
  });
  return (
    <div className="flex-none w-full h-full p-2">
      <button onClick={startMove}> Play </button>
      <div ref={ref} style={styles}>
        <SpriteDragDropContainer id={sprite.id} rotate={(sprite.rotate+"deg")} top={sprite.top} left={sprite.left} title={sprite.title}>
          <CatSprite/>
        </SpriteDragDropContainer>
      </div>
    </div>
  );
}