import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ItemTypes } from '../../utils';
import { Block } from '../Block/Block';

export const SidebarBlockDragContainer = memo(({ id }) => {
    const uId = useSelector((state) => state.dnd.globalBlocks[id].uId);
    const action = useSelector((state) => state.dnd.globalBlocks[id].action);

    const [, drag] = useDrag(() => ({
        type: ItemTypes.BLOCK,
        item: { id: uId, idx: id, action },
    }), [uId, action]);

    return (<div className='mb-1'>
            <div className='inline-block' ref={drag}>
                <Block action={action} id={id} />
            </div>
        </div>
    );
});
