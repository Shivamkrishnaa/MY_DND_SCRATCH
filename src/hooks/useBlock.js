import { useCallback, useState } from 'react';
import { timerEvents } from '../store/preview';

// Custom hook for handling block events
export const useBlockEvents = ({ action, selectedSpriteId, dispatch, resetSprite }) => {
    const [timerId, setTimerId] = useState(null);

    const triggerEvent = useCallback(() => {
        const isTimerEvent = timerEvents.includes(action.name);
        if (isTimerEvent) {
            if (timerId) {
                resetSprite();
                clearTimeout(timerId); // Clear the old timeout
            }
        }

        if (isTimerEvent) {
            setTimerId(
                setTimeout(() => {
                    resetSprite();
                }, action.value.filter((r) => typeof r === 'number')[0] * 1000)
            );
        }

        dispatch({
            type: 'CLICK_PLAY',
            payload: {
                id: selectedSpriteId,
                action,
            },
        });
    }, [action, selectedSpriteId, dispatch, resetSprite, timerId]);

    return { timerId, setTimerId, triggerEvent };
};

// Custom hook for handling block input changes
export const useBlockInputChanges = ({ selectedSpriteId, dispatch, id, rootId, action }) => {
    const handleChange = useCallback(
        (e) => {
            dispatch({
                type: 'MODIFY_BLOCK',
                payload: {
                    spriteId: selectedSpriteId,
                    id,
                    rootId,
                    name: action.name,
                    value: e.target.value,
                },
            });
        },
        [dispatch, selectedSpriteId, id, rootId, action]
    );

    return handleChange;
};

// Custom hook for getting block color
export const useBlockColor = (action) => {
    const getColor = () => action.color || 'blue';
    return getColor;
};