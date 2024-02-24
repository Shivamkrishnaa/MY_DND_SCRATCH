import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesInputBlock from './SubBlocks/DesInputBlock';
import ButtonBlock from './SubBlocks/ButtonBlock';
import GlideInputBlock from './SubBlocks/GlideInputBlock';
import UnoInputField from './SubBlocks/UnoInputField';
import { SAY_BUBBLE, SAY_BUBBLE_FOR, THINK_BUBBLE, THINK_BUBBLE_FOR } from '../../store/block';

export const Block = memo(({ id, action, rootId }) => {
  const [timerId, setTimerId] = useState(null);
  const selectedSpriteId = useSelector((state) => state.preview.present.selectedSpriteId);
  const dispatch = useDispatch();
  const clearBubble = function () {
    dispatch({
      type: "CLICK_PLAY",
      payload: {
        id: selectedSpriteId,
        action: {
          ...action,
          value: false,
        },
      }
    });
  }
  const handleClick = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || !selectedSpriteId) return;
    if([THINK_BUBBLE, THINK_BUBBLE_FOR,SAY_BUBBLE, SAY_BUBBLE_FOR].includes(action.name)) {
      if (timerId) {
        clearTimeout(timerId); // Clear the old timeout
      }
    }
    if([THINK_BUBBLE_FOR, SAY_BUBBLE_FOR].includes(action.name)) {
      
      setTimerId(setTimeout(()=>{
        clearBubble();
      },action.value[1]*1000));
    }
    dispatch({
      type: "CLICK_PLAY",
      payload: {
        id: selectedSpriteId,
        action,
      }
    });
  }, [selectedSpriteId, action]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && selectedSpriteId) {
      if([THINK_BUBBLE, THINK_BUBBLE_FOR,SAY_BUBBLE, SAY_BUBBLE_FOR].includes(action.name)) {
        if (timerId) {
          clearTimeout(timerId); // Clear the old timeout
        }
      }
      if([THINK_BUBBLE_FOR, SAY_BUBBLE_FOR].includes(action.name)) {
        setTimerId(setTimeout(()=>{
          clearBubble();
        },action.value[1]*1000));
      }
      dispatch({
        type: "CLICK_PLAY",
        payload: {
          id: selectedSpriteId,
          action,
        }
      });
    }
  }, [selectedSpriteId, action]);

  const handleChange = useCallback((e) => {
    dispatch({
      type: "MODIFY_BLOCK",
      payload: {
        spriteId: selectedSpriteId,
        id,
        rootId,
        name: action.name,
        value: e.target.value,
      }
    });
  }, [id, rootId, action]);

  const getColor = () => action.color || "blue";

  return (
    <div
      onDoubleClick={handleClick}
      title="double click to play"
      className={`inline-block px-2 py-1 text text-xs text-white cursor-pointer border rounded bg-${getColor()}-500`}
    >
      {renderBlockComponent(action, handleChange, handleKeyDown)}
    </div>
  );
});

const renderBlockComponent = (action, handleChange, handleKeyDown) => {
  if (action?.value === undefined) {
    return <ButtonBlock handleChange={handleChange} {...action} />;
  } else if (Array.isArray(action?.value) && action?.value.length === 2) {
    return <DesInputBlock handleKeyDown={handleKeyDown} handleChange={handleChange} {...action} />;
  } else if (Array.isArray(action?.value) && action?.value.length === 3) {
    return <GlideInputBlock handleKeyDown={handleKeyDown} handleChange={handleChange} {...action} />;
  } else if (typeof action?.value === "number" || typeof action?.value === "string") {
    return <UnoInputField handleKeyDown={handleKeyDown} handleChange={handleChange} {...action} />;
  }
  return <></>;
};
