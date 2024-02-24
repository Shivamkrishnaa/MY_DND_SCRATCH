import React from 'react'
import InputField from './InputField';

export const GlideInputBlock = ({ value, handleChange, handleKeyDown }) => {
    return (
        <span className={`flex items-center`}>
            {" glide "}
            <InputField
                value={value[0]}
                handleKeyDown={handleKeyDown}
                handleChange={(e) => handleChange({
                    target: {
                        value: [e.target.value, value[1], value[2]]
                    }
                })} />
            {" sec to x: "}
            <InputField
                value={value[1]}
                handleKeyDown={handleKeyDown}
                handleChange={(e) => handleChange({
                    target: {
                        value: [value[0], e.target.value, value[2]]
                    }
                })} />
            {" y: "}
            <InputField
                handleKeyDown={handleKeyDown}
                value={value[2]}
                handleChange={(e) => handleChange({
                    target: { value: [value[0], value[1], e.target.value] }
                })} />
        </span>
    )
}
export default GlideInputBlock;