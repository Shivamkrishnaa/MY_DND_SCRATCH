import React, { memo, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { Block } from './Block';

export const DragContainer = memo(({ id }) => {
    const { uId, type, action } = useSelector((state) => {
        return state.globalBlocks[id];
    });
    const dispatch = useDispatch();
    const [, drag] = useDrag(() => ({
        type,
        item: { id: uId, type, action },
        end: (item, monitor) => {
            monitor.didDrop() && dispatch({ "type": "SWITCH_UID", payload: { id } });
        },
    }), [uId, id, action]);
    return (<div ref={drag}><Block action={action} uId={uId} id={id} /></div>);
})
