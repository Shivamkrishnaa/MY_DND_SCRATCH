import React from 'react'
import { useSelector } from 'react-redux'

export const Block = ({ id, children }) => {
    const block = useSelector((state) => {
        return state.blocks.blocks[id];
    })
    return (
        <div className="bg-blue-500 text-white my-2 text-sm cursor-pointer">
            <div className='px-2 py-1'>{block.id}:{block.action}</div>
            {children}
        </div>
    )
}
