import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import CatSprite from "./CatSprite";
import { ItemTypes } from "../utils";
import { SpriteDragDropContainer } from './SpriteDragDropContainer';

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  position: "relative",
};

export default function PreviewArea() {
  const [sprite, setSprite] = useState(
    { id: 1, top: 20, left: 80, title: 'Drag me around' }
  );

  const moveBox = useCallback(
    (id, left, top) => {
      // console.log(id, left, top,' ');
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

  return (
    <div className="flex-none w-full h-full ">
      <div div ref={drop} style={styles}>
        <SpriteDragDropContainer id={sprite.id} top={sprite.top} left={sprite.left} title={sprite.title}>
          <CatSprite />
        </SpriteDragDropContainer>
      </div>
    </div>
  );
  }