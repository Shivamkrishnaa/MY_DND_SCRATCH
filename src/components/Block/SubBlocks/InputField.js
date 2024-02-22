import React, { useEffect, useState } from 'react';

const defaultWidth = 4;

const InputField = ({ value, handleChange, handleKeyDown }) => {
  const [width, setWidth] = useState(defaultWidth);

  const handleFocus = (e) => {
    setWidth(String(value).length < defaultWidth ? defaultWidth : String(value).length);
  };

  const handleBlur = (e) => {
    setWidth(String(value).length < defaultWidth ? String(value).length : defaultWidth);
  };

  useEffect(() => {
    setWidth(String(value).length < defaultWidth ? defaultWidth : String(value).length);
  }, [value]);

  return (
    <input
      style={{ width: `${width}ch` }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="focus:outline-none mx-1 min-w-0 min-w-md w-full max-w-md  text-center text-black border rounded"
      onChange={handleChange}
      value={value}
    />
  );
};

export default InputField;
