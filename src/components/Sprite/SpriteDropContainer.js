import React, { memo } from 'react'
import { SpriteDragContainer } from './SpriteDragContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils';
import { CatSprite } from './CatSprite';
import BubbleContainer from '../Bubble/BubbleContainer';

export const SpriteDropContainer = memo(() => {
    // const ref = useRef();
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
                        spriteId: item.id,
                        delta: monitor.getDifferenceFromInitialOffset()
                    }
                });
                return undefined;
            }
        }), []);


    
    return (
        <div className='h-full w-full border overflow-auto' ref={drop}>
            {sprites.map((id, idx)=> <>
                <BubbleContainer id={id}/>
                <SpriteDragContainer id={id} idx={idx}>
                {/* <div> */}
                    <CatSprite id={id}/>
                    {/* </div> */}
            {/* <BubbleContainer /> */}
            </SpriteDragContainer>
            </>)}
        </div>
    )
})
