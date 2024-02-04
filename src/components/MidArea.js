import React from "react";
import { useSelector } from "react-redux";
import { Box } from "./Box";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";


const styles = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export default function MidArea() {
  const blocks = useSelector((state) => {
    return state.blocksCoordinates.blocks;
  });

  const [, drop] = useDrop(()=>({
    accept: Object.values(ItemTypes),
    drop(item, monitor) {
      console.log("TO DO ACTION")
    }
  }));

  return <div ref={drop} className="flex-1 h-full overflow-auto" style={styles}>
      <div className="font-bold"> {"Midarea"} </div>
    {Object.keys(blocks).map((id, index) => (<Box id={id} key={index} />))}
  </div>;
}
