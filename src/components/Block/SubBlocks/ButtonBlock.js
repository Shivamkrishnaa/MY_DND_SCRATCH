import React, { memo } from 'react'

const ButtonBlock = memo(({ title }) => (
   <span className={`flex items-center`}>
      {` ${title} `}
   </span>
));

export default ButtonBlock;