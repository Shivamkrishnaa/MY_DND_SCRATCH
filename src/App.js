import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { MangageSprite } from "./components/ManageSprites/MangageSprite";
import SpriteWidget from "./components/Sprite/SpriteWidget";
const styles = {
  position: "relative",
};

export default function App() {
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
      <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar /> 
          <MidArea />
        </div>
        <div className="w-1/3 bg-white ">
          <SpriteWidget/>
            <PreviewArea />
            <MangageSprite/>
        </div>
      </div>
    </div>
  );
}
