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
        options: {
            dropEffect: 'copy',
        },
        item: { id: uId, idx: id, type, action },
    }), [uId, id, action]);
    return (<div className='mb-1'>
        <div className='inline-block ' ref={drag} >
            <Block action={action} uId={uId} id={id} />
        </div>
    </div>);
})
