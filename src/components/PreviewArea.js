import React from "react";
import CatSprite from "./CatSprite";

const styles = {
  position: 'relative',
}
export default function PreviewArea() {
  const [top, left] = [40, 20];
  return (
    <div className="flex-none h-full p-2">
      <div style={styles} >
        <span style={{ position: 'absolute', cursor: 'move', top, left }}>
          <CatSprite title={`top:${top} left:${left}`}/>
        </span>
      </div>
    </div>
  );
}
