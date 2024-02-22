import React, { memo, useRef } from "react";import { SpriteDropContainer } from "./Sprite/SpriteDropContainer";
import { SpriteWiget } from "./Sprite/SpriteWiget";


 function PreviewArea() {
  return (
    <div style={{ transform: "rotate(0deg)" }} 
    className="flex-none w-full h-full p-2">
      <SpriteWiget/>
      <SpriteDropContainer/>
    </div>
  );
}
export default memo(PreviewArea);