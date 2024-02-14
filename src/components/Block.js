import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from "./Icon";



export const Block = ({ id, action, rootId }) => {
    // const { action } = useSelector((state)=>{
    //     return rootId ? state.blocks[rootIdx].children[idx] : state.globalBlocks[idx];
    // })
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch({
            type: "MODIFY_BLOCK",
            payload: {
                id,
                rootId,
                name: action.name,
                value: e.target.value,
            }
        })
    }
    return ( <div className="bg-blue-500 block w-30 text-sm cursor-pointer">
                {action.name === "MOVE" ? <div className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
                    <span className='p-2'> Move  </span>
                    <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
                    <span className='p-2'> Steps </span>
                </div> : ""}
                {action.name === "ROTATE_CLOCKWISE" ? <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
                    <span className='p-2'>  {"Turn "} <Icon name="redo" size={15} className="text-white mx-2" />  </span>
                    <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
                    <span className='p-2'> {action.value}  {" degrees"}</span>
                </div> : ""}
                {action.name === "ROTATE_ANTICLOCKWISE" ? <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
                    <span className='p-2'>  {"Turn "} <Icon name="undo" size={15} className="text-white mx-2" />  </span>
                    <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
                    <span className='p-2'> {action.value}  {" degrees"}</span>
                </div> : ""}
                {action.name === "TOP_LEFT" ? <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
                    <span className='p-2'>  {"Turn "} <Icon name="undo" size={15} className="text-white mx-2" />  </span>
                    <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
                    <span className='p-2'> {action.value}  {" degrees"}</span>
                </div> : ""}
                

        </div>)
}
