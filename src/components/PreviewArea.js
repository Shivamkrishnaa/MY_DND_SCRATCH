import React, { memo, useRef } from "react";import { SpriteDropContainer } from "./Sprite/SpriteDropContainer";
import { SpriteWiget } from "./Sprite/SpriteWiget";


 function PreviewArea() {
  return (
    <div
    className="flex-none w-full my-3 mx-2 h-2/3 transform rotate-0 " style={{"overflow" : "auto"}}>
      <SpriteWiget/>
      <SpriteDropContainer/>
    </div>
  );
}
export default memo(PreviewArea);