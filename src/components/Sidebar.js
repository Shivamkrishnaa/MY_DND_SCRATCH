import React, { memo } from "react";
import { useSelector } from "react-redux";
import { SidebarBlockDragContainer } from "./SidebarBlock/SidebarBlockDragContainer";
import { SidebarBlockContainer } from "./SidebarBlock/SidebarBlockContainer";

const Sidebar = () => {

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold text-lg mb-4"> {"Events"} </div>
        <SidebarBlockContainer/>
    </div>
  );
};
export default memo(Sidebar);