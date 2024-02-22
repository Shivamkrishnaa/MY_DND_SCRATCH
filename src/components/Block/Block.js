import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesInputBlock from './SubBlocks/DesInputBlock';
import ButtonBlock from './SubBlocks/ButtonBlock';
import GlideInputBlock from './SubBlocks/GlideInputBlock';
import UnoInputField from './SubBlocks/UnoInputField';

export const Block = memo(({ id, action, rootId }) => {
  const selectedSpriteId = useSelector((state) => state.dnd.selectedSpriteId);
  const dispatch = useDispatch();

  const handleClick = useCallback((e) => {
    if (e.target.tagName === 'INPUT') return;
    dispatch({
      type: "CLICK_PLAY",
      payload: {
        id: selectedSpriteId,
        action,
      }
    });
  }, [selectedSpriteId, action]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
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
    return <DesInputBlock handleChange={handleChange} {...action} />;
  } else if (Array.isArray(action?.value) && action?.value.length === 3) {
    return <GlideInputBlock handleChange={handleChange} {...action} />;
  } else if (typeof action?.value === "number" || typeof action?.value === "string") {
    return <UnoInputField handleKeyDown={handleKeyDown} handleChange={handleChange} {...action} />;
  }
  return <></>;
};
