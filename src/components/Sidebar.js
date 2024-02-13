import React, { memo } from "react";
import { Block } from "./Block";
import { useSelector } from "react-redux";
import { DragContainer } from "./DragContainer";

const Sidebar = memo(() => {
  const blocks = useSelector((state) => {
    return Object.keys(state?.blocks?.blocks||{}) || [];
  })
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start  border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      {blocks.map((id) => (<DragContainer id={id}>
        <Block id={id} />
      </DragContainer>))}
    </div>
  );
});

export default Sidebar;