import React, { memo, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

const style = {
    // position: 'absolute',
    // padding: '0.5rem 1rem',
};
export const DragContainer = memo(({ children, id }) => {
    const dispatch = useDispatch();
    const ref = useRef();
    const { type, action, top, left, uId } = useSelector((state) => {
        return state?.blocks?.blocks?.[id] || {};
    })
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type,
        item: { id, uId, type, action },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            // console.log("DELETE_BLOCK", !!monitor.didDrop(), item);

            if(!monitor.didDrop()) {
                dispatch({
                    type: "DELETE_BLOCK",
                    payload: {
                        dragged: item,
                    },
                });
            } else {
                dispatch({
                    type: "SWITCH_BLOCK_UID",
                    payload: {
                        dragged: item,
                    }
                })
            }
            // if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
            // if(!monitor.didDrop()) {
            //     dispatch({
            //         type: "DELETE_BLOCK",
            //         payload: {
            //             dragged: dragged,
            //         },
            //     });
            // }

            // console.error('side vale box : useDrag : end');
            // console.log('item :', item);
            // console.log('scope item :', { id });
            // console.log('monitor.isOver():', monitor?.isOver?.());
            // console.log('monitor.didDrop():', monitor?.didDrop?.());
            // console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
            // console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
            // console.error(' "side vale box" :', "ADD_BLOCK");


            // console.error("DragContainer DRAG END")
            // dragged.id = uniqueId("ms");
            // const position = {
            //     delta: monitor.getDifferenceFromInitialOffset(),
            //     initialPosition: monitor.getInitialSourceClientOffset(),
            //     finalPosition: monitor.getSourceClientOffset(),
            //     didDrop: monitor.didDrop(),
            // };
            // dispatch({
            //     type: "ADD_BLOCK",
            //     payload: {
            //         dragged,
            //         position,
            //     },
            // });
        }
    }),[id, uId]);
    return (<div style={{ ...style, top, left }} ref={ref}><div ref={drag} ><span>uId:{uId} {children}</span></div></div>);
})
