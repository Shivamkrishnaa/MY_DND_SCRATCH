import React, { memo, useRef } from 'react'
import { SpriteDragContainer } from './SpriteDragContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils';
import { CatSprite } from '../ManageSprites/CatSprite';

export const SpriteDropContainer = memo(() => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const sprites = useSelector((state) => {
        return Object.keys(state.preview.present.sprite);
    });
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.SPRITE,
            drop(item, monitor) {
                dispatch({
                    type: "SPRITE_MOVE", payload: {
                        id: item.id,
                        delta: monitor.getDifferenceFromInitialOffset()
                    }
                });
                return undefined;
            }
        }), []);


    drop(ref);
    return (
        <div className='h-full w-full border border-black' ref={ref}>
            {sprites.map((id, idx)=> <SpriteDragContainer id={id} idx={idx}>
                <CatSprite />
            {/* <BubbleContainer /> */}
            </SpriteDragContainer>)}
        </div>
    )
})
