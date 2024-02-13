import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils'

const style = {
    position: 'absolute',
    backgroundColor: 'white',
    // padding: '0.5rem 1rem',
    cursor: 'move',
}

export const SpriteDragDropContainer = ({ id, left, top, children }) => {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: { id, left, top },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top],
    )
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <div ref={drag} className="box" style={{ ...style, left, top }} data-testid="box" > {children} </div>
    )
}
