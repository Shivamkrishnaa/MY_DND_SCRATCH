import { useCallback, useState } from 'react';
import { timerEvents } from '../store/preview';
import _ from 'lodash';



// Custom hook for handling block events
export const useBlockEvents = ({ dispatch }) => {
    const [timerId, setTimerId] = useState({});
    const triggerEvent = ({ action, selectedSpriteId }) => {
        const resetSprite = () => {
            dispatch({
                type: 'CLICK_PLAY',
                payload: {
                    id: selectedSpriteId,
                    action: {
                        ...action,
                        value: false,
                    },
                },
            });
        };
        const isTimerEvent = timerEvents.includes(action.name);
        if (isTimerEvent) {
            if (timerId?.[selectedSpriteId]?.[action.name]) {
                clearTimeout(timerId[selectedSpriteId][action.name]); // Clear the old timeout
                setTimerId((state)=>{
                    // resetSprite();
                    delete state[selectedSpriteId][action.name];
                    return state;
                });
            }
            setTimerId((timer) => ({
                ...timer,
                [selectedSpriteId]: {
                    ...timer[selectedSpriteId],
                    [action.name]: setTimeout(() => {
                        resetSprite();
                    }, action.value.filter((r) => typeof r === 'number')[0] * 1000)
                }
            }));
        }

        dispatch({
            type: 'CLICK_PLAY',
            payload: {
                id: selectedSpriteId,
                action,
            },
        });
    }

    return { timerId, setTimerId, triggerEvent };
};

// Custom hook for handling block input changes
export const useBlockInputChanges = ({ selectedSpriteId, dispatch, id, rootId, action }) => {
    const handleChange = useCallback(
        (e) => {
            let value = e.target.value;
            if (action?.customProps?.type === "number") {
                if (isNaN(Number(value))) return;
                value = _.clamp(Number(value), action.customProps.min, action.customProps.max)
            }
            dispatch({
                type: 'MODIFY_BLOCK',
                payload: {
                    spriteId: selectedSpriteId,
                    id,
                    rootId,
                    name: action.name,
                    value,
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