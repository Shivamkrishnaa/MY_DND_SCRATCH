import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ManageSpriteContainer } from './ManageSpriteContainer';
import { getSpriteUId } from '../../store/block';



export const MangageSprite = memo(() => {
    const dispatch = useDispatch();
    const sprites = useSelector((state) => {
        return Object.keys(state.dnd.sprite);
    });
    const addSprite = () => {
        const spriteId = getSpriteUId();
        dispatch({
            type: "ADD_SPRITE",
            payload: {
                spriteId,
            }
        });
    }
    return (
        <div className='h-1/3 border-t border-l p-3'>
            <div className='flex justify-between items-center bg-gray-100 border border-gray-300 rounded p-2'>
                <p className='p-1 inline'>
                    Sprites
                </p>
                <button
                    className="float-right bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-white font-bold py-1 px-2 rounded"
                    onClick={addSprite}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className='mt-2 flex flex-column justify-start items-center'>
                <div className='flex flex-row overflow-auto '>
                    {sprites.map((id,idx) => <ManageSpriteContainer id={id} key={idx}/>)}
                </div>

            </div>
        </div>
    )
})
