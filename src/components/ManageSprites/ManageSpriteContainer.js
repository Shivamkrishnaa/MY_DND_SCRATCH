import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CatSprite } from './CatSprite';

export const ManageSpriteContainer = memo(({ id }) => {
    const dispatch = useDispatch();
    const selectedSpriteId = useSelector((state) => {
        return state.preview.present.selectedSpriteId;
    });
    const selectSprite = useCallback(() => {
        dispatch({
            type: "SELECT_SPRITE",
            payload: { id },
        });
    }, [id]);
    const removeSprite = useCallback(() => {
        dispatch({
            type: "REMOVE_SPRITE",
            payload: { id },
        });
    }, [id]);
    return (
        <div className='scroll-snap-center flex flex-col justify-center items-center cursor-pointer border-r p-2 hover:bg-blue-300 rounded'>
            <div
                onClick={selectSprite} 
                className={"basis-3/4 focus:outline-none focus:ring font-bold py-1 px-2 p-4 cursor-pointer" +
                    (selectedSpriteId === id ? " outline-none border-b-2 border-blue-300 " : "")}>
                <CatSprite />
            </div>
            <button
                className="basis-1/4 mt-2 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring
                                 focus:border-red-300 text-white font-bold py-1 px-2 rounded"
                onClick={removeSprite}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
})