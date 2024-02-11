import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

const style = {
    // position: 'absolute',
    // display: "inline-block",
    padding: '0rem',
    margin: '0rem',
    background: "lightblue",
};
export const ItemDragContainer = ({ children, id }) => {
    // const dispatch = useDispatch();
    const ref = useRef();
    const { type = "Motion", action, top, left } = useSelector((state) => {
        return state?.blocks?.blocks[id] || {};
    });
    const [collected, drag, dragPreview] = useDrag(() => ({
        type,
        item: { id, type, action },
        end: (item, monitor) => {
            // if (monitor?.didDrop?.()) {
            //     dispatch({
            //         type: "MOVE_MID_BLOCK",
            //         payload: {
            //             item,
            //             delta: monitor.getDifferenceFromInitialOffset(),
            //         },
            //     });
            // }

            console.error('DragContainer : useDrag : end');
            console.log('item :', item);
            console.log('scope item :', { id });
            console.log('monitor.isOver():', monitor?.isOver?.());
            console.log('monitor.didDrop():', monitor?.didDrop?.());
            console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
            console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
            console.error(' "ADD_BLOCK" :', "ADD_BLOCK");


            // console.error("DragContainer DRAG END")
            // // dragged.id = uniqueId("ms");
            // // const position = {
            // //     delta: monitor.getDifferenceFromInitialOffset(),
            // //     initialPosition: monitor.getInitialSourceClientOffset(),
            // //     finalPosition: monitor.getSourceClientOffset(),
            // //     didDrop: monitor.didDrop(),
            // // };
            // // dispatch({
            // //     type: "ADD_BLOCK",
            // //     payload: {
            // //         dragged,
            // //         position,
            // //     },
            // // });
        }
    }));
    return collected.isDragging ? (
        <div className={'drag-container--'+id} style={{
            ...style,
            top, left,


        }} ref={dragPreview} />
    ) : (<div className={'drag-container--'+id} style={{
        ...style,
        top, left,


    }} 
    ref={drag} >1{children}</div>);
}
