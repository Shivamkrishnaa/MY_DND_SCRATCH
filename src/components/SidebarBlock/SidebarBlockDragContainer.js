import React, { memo } from 'react'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux';
import { Block } from '../Block/Block';


export const SidebarBlockDragContainer = memo(({ id }) => {
    const { uId, type, action } = useSelector((state) => {
        return state.dnd.globalBlocks[id];
    });
    const [, drag] = useDrag(() => ({
        type,
        item: { id: uId, idx: id, type, action },
    }), [uId, id, action]);
    return (<div className='p-3' ref={drag}><Block action={action} uId={uId} id={id} /></div>);
})
