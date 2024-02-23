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
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: ItemTypes.SPRITE,
            item: { id },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [],
    );
    if(display == "none") {
        return <></>
    }
    return (<>
        <div ref={drag} data-testid="box"
            className="relative inline-block"
            style={{
                top: `calc(60% - 14rem + ${top}px)`,
                left: `calc(85% - 14.5rem + ${left}px)`,
                rotate: `${rotate}deg`,
                transition,
                opacity,
            }}
        >
            <div className="inline-block">
                {children}
            </div>
        </div>
    </>
    )
})
