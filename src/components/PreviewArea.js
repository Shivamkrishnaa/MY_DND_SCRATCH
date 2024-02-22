import React, { memo, useRef } from "react";import { SpriteDropContainer } from "./Sprite/SpriteDropContainer";
import { SpriteWiget } from "./Sprite/SpriteWiget";


 function PreviewArea() {
  return (
    <div
    className="flex-none w-full p-2 h-2/3 transform rotate-0">
      <SpriteWiget/>
      <SpriteDropContainer/>
    </div>
  );
}
export default memo(PreviewArea);