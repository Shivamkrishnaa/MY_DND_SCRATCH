import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from "./Icon";

const InputField = ({ value, handleChange, title }) => {
    const [x, setX] = useState(value[0]);
    const [y, setY] = useState(value[1]);
    useEffect(() => {
        handleChange({ target: { value: [x, y] } })
    }, [x, y]);
    return <div title={title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
        <span className='p-2'>{" go to x:"}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setX(e.target.value)} value={x} />
        <span className='p-2'>{" y: "}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setY(e.target.value)} value={y} />
    </div>
}
const SingleInputField = ({ value, handleChange, title }) => {
    const [val, setVal] = useState(value);
    useEffect(() => {
        handleChange({ target: { value: val } })
    }, [val]);
    return <div title={title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
        <span className='p-2'>{` ${title} `}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setVal(e.target.value)} value={val} />
    </div>
}
const GlideInputField = ({ value, handleChange, title }) => {
    const [t, setT] = useState(value[0]);
    const [x, setX] = useState(value[1]);
    const [y, setY] = useState(value[2]);
    useEffect(() => {
        handleChange({ target: { value: [t, x, y] } });
    }, [t, x, y]);
    return (<div title={title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
        <span className='p-2'>{" glide "}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setT(e.target.value)} value={t} />
        <span className='p-2'>{" sec to x: "}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setX(e.target.value)} value={x} />
        <span className='p-2'>{" y: "}</span>
        <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={(e) => setY(e.target.value)} value={y} />
    </div>);
}

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
    return (<div className="bg-blue-500 block w-30 text-sm cursor-pointer">
        {action.name === "MOVE" ? <div className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
            <span className='p-2'> Move  </span>
            <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
            <span className='p-2'> Steps </span>
        </div> : ""}
        {action.name === "ROTATE_CLOCKWISE" ? <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
            <span className='p-2'>  {" turn "} <Icon name="redo" size={15} className="text-white mx-2" />  </span>
            <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
            <span className='p-2'> {action.value}  {" degrees"}</span>
        </div> : ""}
        {action.name === "ROTATE_ANTICLOCKWISE" ? <div title={action.title} className="flex flex-row flex-wrap justify-center items-center text-white  bg-blue-500 border-r border-gray-200 px-2 py-1 my-2 text-sm cursor-pointer">
            <span className='p-2'>  {" turn "} <Icon name="undo" size={15} className="text-white mx-2" />  </span>
            <input className="p-2 h-6 w-8 text-black border rounded-md" onChange={handleChange} value={action.value} />
            <span className='p-2'> {action.value}  {" degrees"}</span>
        </div> : ""}
        {action.name === "GO_TO_COORDINATES" ? <InputField title={action.title} handleChange={handleChange} value={action.value} /> : ""}
        {action.name === "GLIDE_TO_COORDINATES" ? <GlideInputField title={action.title} handleChange={handleChange} value={action.value} /> : ""}
        {[ "POINT_IN_DIRECTION", "CHANGE_X_BY", "CHANGE_Y_BY", "SET_X_TO", "SET_Y_TO" ].includes(action.name) ? <SingleInputField title={action.title} handleChange={handleChange} value={action.value} /> : ""}
    </div>)
}
