import React from 'react'
import { useSelector } from 'react-redux'

export const Block = ({ id, children }) => {
    const { action } = useSelector((state) => {
        return state.blocks.blocks[id];
    })
    return (
        <div className="
        m-3
        sk-bg-blue-500 sk-text-white 
        my-2 text-sm cursor-pointer">
            <div className='px-4 py-3'>{id} : {action}</div>
            {children}
        </div>
    )
}
