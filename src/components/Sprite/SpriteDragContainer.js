import React, { memo } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../utils'
import { useSelector } from 'react-redux'

export const SpriteDragContainer = memo(({ id, children }) => {
    const {
        left,
        top,
        rotate,
        transition,
        display,
    } = useSelector((state) => {
        return {
            left: state.preview.present.sprite[id].left,
            top: state.preview.present.sprite[id].top,
            rotate: state.preview.present.sprite[id].rotate,
            transition: state.preview.present.sprite[id].transition,
            display: state.preview.present.sprite[id].display,
        };
    })
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: { id },
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
})
