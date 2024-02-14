import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils'

const style = {
    position: 'relative',
    backgroundColor: 'white',
    cursor: 'move',
}

export const SpriteDragDropContainer = ({ id, left, top, rotate, children }) => {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: { id, left, top, rotate },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, rotate],
    )
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <div ref={drag} className="box" style={{ ...style, rotate, left, top }} data-testid="box" > {children} </div>
    )
}
