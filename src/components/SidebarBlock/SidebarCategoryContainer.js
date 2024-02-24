import React from 'react'
import { useSelector } from 'react-redux';
import { SidebarBlockDragContainer } from './SidebarBlockDragContainer';

export const SidebarCategoryContainer = ({ category, children }) => {
    const blocks = useSelector((state) => {
        const categories = _.groupBy(Object.values(state.dnd.globalBlocks), 'category');
        return categories[category].map(r=>r.id);
    });
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


export default SidebarCategoryContainer;