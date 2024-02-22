import React from 'react'
import { useSelector } from 'react-redux';
import { SidebarBlockDragContainer } from './SidebarBlockDragContainer';

export const SidebarCategoryContainer = ({ category, children }) => {
    const blocks = useSelector((state) => {
        const categories = _.groupBy(Object.values(state.dnd.globalBlocks), 'category');
        return categories[category].map(r=>r.id);
    });
    return (
        <div className='w-full mb-4 border-t'>
            <div className="text-sm my-2">
                {category}
            </div>
            {blocks.map((id, idx) => (
                <SidebarBlockDragContainer key={idx} id={id} />
            ))}
        </div>
    )
}


export default SidebarCategoryContainer;