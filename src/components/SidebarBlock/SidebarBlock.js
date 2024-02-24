import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesInputBlock from '../Block/SubBlocks/DesInputBlock';
import ButtonBlock from '../Block/SubBlocks/ButtonBlock';
import GlideInputBlock from '../Block/SubBlocks/GlideInputBlock';
import UnoInputField from '../Block/SubBlocks/UnoInputField';
import { useBlockColor, useBlockEvents, useBlockInputChanges } from '../../hooks/useBlock';


export const SidebarBlock = memo(({ id, action, rootId }) => {
  const selectedSpriteId = useSelector((state) => state.preview.present.selectedSpriteId);
  const dispatch = useDispatch();

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

  const { timerId, triggerEvent } = useBlockEvents({
    action,
    selectedSpriteId,
    dispatch,
    resetSprite,
  });

  const handleChange = useBlockInputChanges({
    selectedSpriteId,
    dispatch,
    id,
    rootId,
    action,
  });

  const getColor = useBlockColor(action);

  const handleClick = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || !selectedSpriteId) return;
      triggerEvent();
    },
    [selectedSpriteId, triggerEvent]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedSpriteId) return;
      e.key === 'Enter' && triggerEvent();
    },
    [
      selectedSpriteId, 
      triggerEvent]
  );

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
  } else if (typeof action?.value === 'number' || typeof action?.value === 'string') {
    return <UnoInputField handleKeyDown={handleKeyDown} handleChange={handleChange} {...action} />;
  }
  return <></>;
};

export default SidebarBlock;