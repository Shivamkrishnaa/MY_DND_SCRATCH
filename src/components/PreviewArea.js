import React, { memo } from "react";

import { SpriteDropContainer } from "./Sprite/SpriteDropContainer";
import SpriteWidget from "./Sprite/SpriteWidget";


 function PreviewArea() {
  return (
    <div className="flex-none w-full my-3 px-2 h-2/3 ">
      <SpriteDropContainer/>
    </div>
  );
}
export default memo(PreviewArea);