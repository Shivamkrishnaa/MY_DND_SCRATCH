import React, { memo } from 'react'
import Icon from '../Icon';
import InputField from './InputField';

const DesInputBlock = memo(({ value, title, handleChange, handleKeyDown, icon }) => {
  const [t1, t2, t3] = title.split('{x}')
  return (
    <> {t1 && ` ${t1} `}
      {icon && <Icon name={icon} size={15} className="text-white mx-2" />}
      <InputField value={value[0]}
        handleKeyDown={handleKeyDown}
        handleChange={(e) => handleChange({
          target: {
            value: [e.target.value, value[1]]
          }
        })} />
      {t2 && ` ${t2} `}
      <InputField
        value={value[1]}
        handleKeyDown={handleKeyDown}
        handleChange={(e) => handleChange({
          target: {
            value: [value[0], e.target.value]
          }
        })} />
      {t3 && ` ${t3} `}</>
  );
});

export default DesInputBlock;