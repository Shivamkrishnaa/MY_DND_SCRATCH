import React from 'react'

export const Block = ({ id, action, uId, rootId }) => {
    return (
        <div className="m-3 bg-blue-500 text-white my-2 text-sm cursor-pointer">
            <div className='px-4 py-3'>{uId} : {id} : {action} : {rootId}</div>
        </div>
    )
}
