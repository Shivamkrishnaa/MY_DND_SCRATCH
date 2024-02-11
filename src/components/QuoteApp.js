import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { QBlock } from "./QBlock";
import { DragContainer } from './DragContainer';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle,
  transform: isDragging ? draggableStyle?.transform : 'translate(0px, 0px)',
});
const getListStyle = isDraggingOver => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export function QuoteApp() {
  
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    
    document.getElementById("CustomId")?.remove();
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }
  const [loading, setLoading] = useState();
  function onDragStart(r) {
    // console.log(r.draggableId.split("-")[1],' r');
    const styleElement = document.createElement('style');
    styleElement.id = "CustomId";
    const dynamicCSS = `
    .drag-container--${Number(r.draggableId.split("-")[1]) } ~ * {
      display: none;
    }
    `;

    // Add the dynamic CSS rules to the style element
    styleElement.appendChild(document.createTextNode(dynamicCSS));

    // Append the style element to the document head
    document.head.appendChild(styleElement);
    setLoading(!loading);
  }

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {state.map((el, ind) => (
          <DragContainer id={ind + 1}>
            <QBlock el={el} ind={ind} loading={loading} />
          </DragContainer>
        ))}
      </DragDropContext>
    </React.Fragment>
  );
}
