import React, { memo } from "react";

import { SpriteDropContainer } from "./Sprite/SpriteDropContainer";
import SpriteWidget from "./Sprite/SpriteWidget";


 function PreviewArea() {
  return (
    <div
    className="flex-none w-full my-3 mx-2 h-2/3 transform rotate-0 " style={{"overflow" : "auto"}}>
      <SpriteWidget/>
      <SpriteDropContainer/>
    </div>
  );
}
export default memo(PreviewArea);