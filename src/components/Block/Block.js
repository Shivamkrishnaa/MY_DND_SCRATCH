import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "./Icon";


const InputField = memo(({ value, handleChange, title, color = "blue", icon }) => {
   const [t1, t2, t3] = title.split('{x}')
   return (
      <div className={`px-1 py-2 whitespace-nowrap border border-black border-solid border-1 bg-${color}-500`}>
         {t1 && ` ${t1} `}
         {icon && <Icon name={icon} size={15} className="text-white mx-2" />}
         <input className={`p-2 ml-1 mr-1 h-6 w-full max-w-md text-black border rounded-md`} onChange={(e) => handleChange({ target: { value: [e.target.value, (value[1])] } })} value={value[0]} />
         {t2 && ` ${t2} `}
         <input className={`p-2 ml-1 mr-1 h-6 w-full max-w-md text-black border rounded-md`} onChange={(e) => handleChange({ target: { value: [value[0], e.target.value] } })} value={value[1]} />
         {t3 && ` ${t3} `}
      </div>
   );
});

const Button = memo(({ title, color = "purple" }) => (
   <span className={`px-1 py-2 whitespace-nowrap border border-black border-solid border-1  bg-${color}-500 flex items-center`}>
      {` ${title} `}
   </span>
));

const SingleInputField = memo(({ value, handleChange, title, icon, color = "blue" }) => {
   const [t1, t2] = title.split('{x}');
   return (
      <p className={`px-1 py-2 whitespace-nowrap border border-black border-solid border-1 bg-${color}-500 flex items-center`}>
         {` ${t1} `}
         {icon && <Icon name={icon} size={15} className="text-white mx-2" />}
         <input className={`p-2  ml-1 mr-1 h-6 w-full max-w-md text-black border rounded`} onChange={handleChange} value={value} />
         {t2 && ` ${t2} `}
      </p>
   );
})

const GlideInputField = memo(({ value, handleChange, title, color="blue" }) => {

   return (
      <p className={`px-1 py-2 whitespace-nowrap border border-black border-solid border-1 bg-${color}-500 flex items-center`}>
         {" glide "}
         <input className={`p-2 ml-1 mr-1 h-6 w-full max-w-md text-black border rounded-md`} onChange={(e) => handleChange({ target: {value:[e.target.value, value[1], value[2]]} })} value={value[0]} />
         {" sec to x: "}
         <input className={`p-2 ml-1 mr-1 h-6 w-full max-w-md text-black border rounded-md`} onChange={(e) => handleChange({ target: {value:[value[0], e.target.value, value[2]]} })} value={value[1]} />
         {" y: "}
         <input className={`p-2 ml-1 mr-1 h-6 w-full max-w-md text-black border rounded-md`} onChange={(e) => handleChange({ target: {value:[value[0], value[1], e.target.value]} })} value={value[2]} />
      </p>
   );
})

export const Block = memo(({ id, action, rootId }) => {
   // console.log(id, rootId,' id, rootId');
   const selectedSpriteId = useSelector((state) => {
      return state.dnd.selectedSpriteId;
    });
   const dispatch = useDispatch();
   const handleClick = () => {
      dispatch({
         type: "CLICK_PLAY",
         payload: {
            id: selectedSpriteId,
            action,
         }
      });
   }
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
   }, [action, id, rootId]);
   return (
      <div className="text-sm cursor-pointer">
         <div title="double click to play" onDoubleClick={handleClick} className={`inline-block text-white border-r border-gray-200 text-sm cursor-pointer`}>
            {action?.value === undefined && <Button handleChange={handleChange} {...action} />}
            {(Array.isArray(action?.value) && action?.value.length == 2) && <InputField handleChange={handleChange} {...action} />}
            {(Array.isArray(action?.value) && action?.value.length == 3) && <GlideInputField handleChange={handleChange} {...action} />}
            {(typeof action?.value === "number" || typeof action?.value === "string") && <SingleInputField handleChange={handleChange} {...action} />}
         </div>
      </div>
   );
})
