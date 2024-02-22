import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import {CatSprite} from './CatSprite';

export const ManageSpriteContainer = memo(({ id }) => {
    const dispatch = useDispatch();
    const selectedSpriteId = useSelector((state) => {
        return state.dnd.selectedSpriteId;
    });
    const selectSprite = useCallback(()=>{
        dispatch({
            type: "SELECT_SPRITE",
            payload: { id },
        });
    },[id]);
    const removeSprite = useCallback((e) => {
        dispatch({
            type: "REMOVE_SPRITE",
            payload: { id },
        });
        e.target.stopPropogation();
    },[id]);
    return (
        <div
            onClick={selectSprite}
            className={" flex flex-col border p-4 mb-4 cursor-pointer bg-gray-100" +
                (selectedSpriteId === id ? " outline-none ring border-blue-300 " : "")}>
            <CatSprite />
            <button
                className="mt-2 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring
                                 focus:border-red-300 text-white font-bold py-1 px-2 rounded"
                onClick={removeSprite}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
})