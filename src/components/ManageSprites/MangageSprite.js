import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ManageSpriteContainer } from './ManageSpriteContainer';
import { getSpriteUId } from '../../store/block';

import "./manageSprite.css";

export const MangageSprite = memo(() => {
    const dispatch = useDispatch();
    const sprites = useSelector((state) => {
        return Object.keys(state.preview.present.sprite);
    });
    const addSprite = () => {
        dispatch({
            type: "ADD_SPRITE"
        });
    }
    return (
        <div className='h-1/3 px-2 mt-1'>
            <div className='border-t pt-2 flex justify-between items-center'>
                <div className="font-bold text-lg"> {"Sprites"} </div>
                <button
                    className="float-right bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-white font-bold py-1 px-2 rounded"
                    onClick={addSprite}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className='mt-2 border border-gray-300 rounded p-2 flex flex-column justify-start items-center'>
                <div className='flex flex-row space-2 overflow-x-scroll scroll-snap-x'>
                    {sprites.length === 0 && <div className='pt-10 pb-10 pl-3 text-sm text-gray-300'>Add a sprite</div>}
                    {sprites.map((id, idx) => <ManageSpriteContainer id={id} key={idx} />)}
                </div>
            </div>
        </div>
    )
})
