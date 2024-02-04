import React from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { ItemTypes } from '../utils';

export const Container = ({ children, type=ItemTypes.MOTION, id }) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type,
        item: { id },
        end: (item, monitor) => {
            // add id to list
        }
    }));
    return collected.isDragging ? (
        <div ref={dragPreview} />
    ) : (<div ref={drag} >{children}</div>);
}
