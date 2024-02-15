import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Icon from "./Icon";
import { CHANGE_SIZE, CHANGE_SIZE_BY, HIDE_SVG, SHOW_SVG } from '../store/block';

const InputField = memo(({ value, handleChange, title }) => {
   return (
      <div title={title} className="flex flex-row flex-wrap justify-center items-center text-white bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
         <span className='p-2'>{" go to x:"}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => handleChange({target: [e.target.value, value[1]]})} value={value[0]} />
         <span className='p-2'>{" y: "}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => handleChange({target: [value[0], e.target.value] })} value={value[1]} />
      </div>
   );
})

const Button = memo(({ title, color="purple" }) => (
   <div title={title} className={`flex flex-row flex-wrap justify-center items-center text-white bg-${color}-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer`}>
      <span className='p-2'>{` ${title} `}</span>
   </div>
));

const SingleInputField = memo(({ value, handleChange, title, color="blue" }) => {

   return (
      <div title={title} className={`flex flex-row flex-wrap justify-center items-center text-white bg-${color}-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer`}>
         <span className='p-2'>{` ${title} `}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={value} />
      </div>
   );
})

const GlideInputField = memo(({ value, handleChange, title }) => {

   return (
      <div title={title} className="flex flex-row flex-wrap justify-center items-center text-white bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
         <span className='p-2'>{" glide "}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => handleChange({ target: [e.target.value, value[1],value[2] ]})} value={value[0]} />
         <span className='p-2'>{" sec to x: "}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => handleChange({ target: [value[0], e.target.value, value[2]]})}  value={value[1]} />
         <span className='p-2'>{" y: "}</span>
         <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => handleChange({ target: [value[0], value[1], e.target.value]})}  value={value[2]} />
      </div>
   );
})

export const Block = ({ id, action, rootId }) => {
   const dispatch = useDispatch();

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
      <div className="bg-blue-500 block w-30 text-sm cursor-pointer">
         {action.name === "MOVE" && (
            <div className="flex flex-row flex-wrap justify-center items-center text-white bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
               <span className='p-2'> Move  </span>
               <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
               <span className='p-2'> Steps </span>
            </div>
         )}
         {action.name === "ROTATE_CLOCKWISE" && (
            <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
               <span className='p-2'>  {" turn "} <Icon name="redo" size={15} className="text-white mx-2" />  </span>
               <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
               <span className='p-2'> {action.value}  {" degrees"}</span>
            </div>
         )}
         {action.name === "ROTATE_ANTICLOCKWISE" && (
            <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
               <span className='p-2'>  {" turn "} <Icon name="undo" size={15} className="text-white mx-2" />  </span>
               <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
               <span className='p-2'> {action.value}  {" degrees"}</span>
            </div>
         )}
         {action.name === "GO_TO_COORDINATES" && <InputField title={action.title} handleChange={handleChange} value={action.value} />}
         {action.name === "GLIDE_TO_COORDINATES" && <GlideInputField title={action.title} handleChange={handleChange} value={action.value} />}
         {["POINT_IN_DIRECTION", "CHANGE_X_BY", "CHANGE_Y_BY", "SET_X_TO", "SET_Y_TO"].includes(action.name) && <SingleInputField title={action.title} handleChange={handleChange} value={action.value} />}
         {[CHANGE_SIZE_BY, CHANGE_SIZE].includes(action.name) && <SingleInputField color="purple" title={action.title} handleChange={handleChange} value={action.value} />}
         {[HIDE_SVG, SHOW_SVG].includes(action.name) && <Button color="purple" title={action.title} handleChange={handleChange} value={action.value} />}
      </div>
   );
}
