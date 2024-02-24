import React from 'react'
import SidebarCategoryContainer from './SidebarCategoryContainer';
import { defaultCategories } from '../../store/block';

export const SidebarBlockContainer = () => {
    const categories = defaultCategories;
    return categories.map(category => {
        return (<SidebarCategoryContainer category={category} />)
    });
}
export default SidebarBlockContainer;