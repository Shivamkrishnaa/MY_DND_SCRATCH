import React, { useCallback, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from 'styled-components';
import { ItemDragContainer } from './ItemDragContainer';
import { useDrag } from 'react-dnd';
const Item = styled.div`
  /* item styles */
 `;

const Clone = styled(Item)`
  + div {
    display: none !important;
    font-size: 0px !important;
  }
`;

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    //   background: isDragging ? "lightgreen" : "grey",
    // styles we need to apply on draggables
    ...draggableStyle,
    transform: isDragging ? draggableStyle?.transform : 'translate(0px, 0px)',
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    height: "auto",
    width: 250
});
export const QBlock = ({ ind, el, loading }) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: "Motion",
        item: { id: 1},
        end: (item, monitor) => {

            console.error('DragContainer : useDrag : end');
            console.log('item :', "item");
            console.log('scope item :', { id: "id" });
            console.log('monitor.isOver():', monitor?.isOver?.());
            console.log('monitor.didDrop():', monitor?.didDrop?.());
            console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
            console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
            console.error(' "ADD_BLOCK" :', "ADD_BLOCK");
        }
    }));
    const dragDivRef = useRef(null);

    // Combine the refs using useCallback
    const combinedRef = useCallback(
      (node) => {
        // Call both drag ref and innerRef
        drag(node);
        dragDivRef.current = node;
      },
      [drag]
    );

    return (
        <Droppable key={ind} droppableId={`${ind}`} >
            {(provided, snapshot) => {
                // console.log(provided, snapshot,' provided, snapshot ');
                return (
                    <div
                        loading={loading}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {el.map((item, index) => {
                            return (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => {
                                        // console.log(provided, snapshot,' provided, snapshot ');
                                        return (
                                            <React.Fragment>
                                                    <div 
                                                    > 
                                                    {/* <div
                                                    ref={drag}
                                                    >
                                                            123
                                                    </div> */}
                                                <div
                                              ref={(node) => {
                                                provided.innerRef(node);
                                                combinedRef(node);
                                              }}
                                                    // ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    className={"item-" + index}
                                                >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around"
                                                            }}
                                                        >
                                                            {item.content}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newState = [...state];
                                                                    newState[ind].splice(index, 1);
                                                                    setState(
                                                                        newState.filter(group => group.length)
                                                                    );
                                                                }}
                                                            >
                                                                delete
                                                            </button>
                                                        </div>

                                                </div>
                                                {snapshot.isDragging &&
                                                    <Clone>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around"
                                                            }}
                                                        >
                                                            {item.content}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newState = [...state];
                                                                    newState[ind].splice(index, 1);
                                                                    setState(
                                                                        newState.filter(group => group.length)
                                                                    );
                                                                }}
                                                            >
                                                                delete
                                                            </button>
                                                        </div>
                                                    </Clone>}
                                                    </div>
                                            </React.Fragment>

                                        )
                                    }}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
}
