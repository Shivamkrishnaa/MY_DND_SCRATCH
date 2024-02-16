import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils'
import { useSelector } from 'react-redux'

export const SpriteDragDropContainer = ({ children }) => {
    const {
        left,
        top,
        rotate,
        transition,
        display,
    } = useSelector((state) => {
        return {
            left: state.sprite.present.sprite.left,
            top: state.sprite.present.sprite.top,
            rotate: state.sprite.present.sprite.rotate,
            transition: state.sprite.present.sprite.transition,
            display: state.sprite.present.sprite.display,
        };
    })
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: {},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [],
    )
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <div ref={drag} className="box absolute " data-testid="box"
            style={{
                display,
                rotate:`${rotate}deg`,
                left: `calc(50% - 7rem + ${left}px)`,
                top: `calc(50% - 7rem + ${top}px)`,
                transition
            }}
        >
        {children} </div>
    )
}
