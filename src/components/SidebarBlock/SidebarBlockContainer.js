import React from 'react'
import SidebarCategoryContainer from './SidebarCategoryContainer';
import { useSelector } from 'react-redux';

export const SidebarBlockContainer = () => {
    const categories = useSelector((state) => {
        return Object.keys(_.groupBy(Object.values(state.dnd.globalBlocks), 'category'));
    });
    return categories.map(category => {
        return (<SidebarCategoryContainer category={category} />)
    });
}
export default SidebarBlockContainer;