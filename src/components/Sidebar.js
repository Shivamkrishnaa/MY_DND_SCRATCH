import React from "react";
import { Block } from "./Block";
import { Container } from "./Container";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const blocks = useSelector((state) => {
    return Object.keys(state.blocks.blocks);
  })
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      {blocks.map(id => (<Container id={id}>
        <Block id={id} />
      </Container>))}
    </div>
  );
};