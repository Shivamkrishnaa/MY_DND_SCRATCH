import React, { memo } from 'react'
import Icon from '../Icon';
import InputField from './InputField';

export const UnoInputField = memo(({ value, handleKeyDown, handleChange, title, icon, color = "blue" }) => {
   const [t1, t2] = title.split('{x}');
   return (
      <p className={`flex items-center`}>
         {` ${t1} `}
         {icon && <Icon name={icon} size={15} className="text-white ml-1" />}
         <InputField handleKeyDown={handleKeyDown} value={value} handleChange={handleChange}/>
         {t2 && ` ${t2} `}
      </p>
   );
})

export default UnoInputField;