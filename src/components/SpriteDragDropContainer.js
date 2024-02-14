import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils'

const style = {
    position: 'absolute',
    backgroundColor: 'white',
    cursor: 'move',
}

export const SpriteDragDropContainer = ({ id, sprite, left, top, rotate, transition, children }) => {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: sprite,
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
        <div ref={drag} className="box" style={{ ...style, rotate, left, top, transition }} data-testid="box" > {children} </div>
    )
}
