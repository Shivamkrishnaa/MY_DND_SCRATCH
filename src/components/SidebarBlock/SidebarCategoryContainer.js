import React, { memo } from 'react'
import { SidebarBlockDragContainer } from './SidebarBlockDragContainer';
import { blockCategories } from '../../store/block';

const SidebarCategoryContainer = ({ category }) => {
    const blocks = blockCategories[category].map(r=>r.id);
    return (
        <div className='w-full mb-4 border-t overflow-y-auto'>
            <div className="text-sm sticky top-0 bg-white py-2">
                {category}
            </div>
            {blocks.map((id, idx) => (
                <SidebarBlockDragContainer key={idx} id={id} />
            ))}
        </div>
    )
}


export default memo(SidebarCategoryContainer);