import React, { memo } from 'react';
import { DragDropContainer } from './DragDropContainer';
import { Block } from './Block';

export const BlocksContainer = memo(({ items, index = 0, rootId }) => {
  if (!items) {
    return <></>;
  }
  if (typeof items === "number") {
    return (
      <DragDropContainer index={index} id={items} rootId={rootId}>
        <Block id={items} />
      </DragDropContainer>
    );
  }

  const [id, item] = items;

  return (
    <DragDropContainer index={index} id={id} rootId={rootId}>
      <Block index={index} id={id}>
        {Array.isArray(item) ? <BlocksContainer rootId={rootId} items={item} index={index + 1} /> : null}
      </Block>
    </DragDropContainer>
  );
});