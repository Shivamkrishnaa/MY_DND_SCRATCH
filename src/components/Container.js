import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
function SideBlocks({ index }) {
    const { type, action } = useSelector((state) => {
        return state.globalBlocks[index];
    });
    const [collected, drag] = useDrag(() => ({
        type: type,
        item: { index },
        end: (item, monitor) => {
            console.error('SideBlocks : useDrag : end');
            console.log('item :', item);
            console.log('scope item :', { index });
            console.log('monitor.isOver():', monitor?.isOver?.());
            console.log('monitor.didDrop():', monitor?.didDrop?.());
            console.log('monitor.getDifferenceFromInitialOffset():', monitor?.getDifferenceFromInitialOffset?.());
            console.log('monitor.getInitialSourceClientOffset():', monitor?.getInitialSourceClientOffset?.());
            console.error(' "SideBlocks" :', "ADD_BLOCK");
        }
    }), [index]);
    return <div ref={drag}> {action} </div>
}
function MySideBar() {
    const blocks = useSelector((state) => {
        return state.globalBlocks;
    });
    return (<span className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
        <ul>
            {blocks.map((r, i) => <li>
                <SideBlocks index={i} />
            </li>)}
        </ul>
    </span>);
}
function MyBox() {
    const [{ isOver, isOverCurrent }, drop] = useDrop(()=>({
        accept: "Motion",
        collect: (monitor) => ({
            isOver: !!monitor.isOver({ shallow: true }),
            canDrop: !!monitor.canDrop(),
          }),
        //   hover: console.log,
        drop(item, monitor) {
            if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
            console.error('andar vala DropContainer : useDrop : drop');
            console.log('item :', item);
            console.log('monitor.isOver(), :', monitor?.isOver());
            console.log('monitor.getDifferenceFromInitialOffset() :', monitor?.getDifferenceFromInitialOffset());
            console.log('monitor.getInitialSourceClientOffset() :', monitor?.getInitialSourceClientOffset());
            console.info('monitor.didDrop() :', monitor?.didDrop());
            console.info('monitor.getDropResult() :', monitor?.getDropResult());
            console.info('monitor.getItemType() :', monitor?.getItemType());
            console.error(' andar vala _CONTAINER :',  "TOP  _CONTAINER");
        },
      }),[]);

    return (<ul ref={drop} className='box1' style={{ width: "10rem", top: `calc( 5rem + 200px )`, left: `calc( 15rem + 200px )`, position: 'absolute', background: 'red', display: 'inline-block'}}>
            <li style={{ height: "6rem" }}>1</li>
            <li style={{ height: "6rem" }}>2</li>
            <li style={{ height: "6rem" }}>3</li>
        </ul>);
}
function MyMidArea() {
  const [{ isOver, isOverCurrent }, drop] = useDrop(()=>({
    accept: "Motion",
    collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    drop(item, monitor) {
        
        if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
        console.log(!!monitor.didDrop() && !!monitor.getDropResult());
        console.error('WHITE DropContainer : useDrop : drop');
        console.log('item :', item);
        console.log('monitor.isOver(), :', monitor?.isOver());
        console.log('monitor.getDifferenceFromInitialOffset() :', monitor?.getDifferenceFromInitialOffset());
        console.log('monitor.getInitialSourceClientOffset() :', monitor?.getInitialSourceClientOffset());
        console.info('monitor.didDrop() :', monitor?.didDrop());
        console.info('monitor.getDropResult() :', monitor?.getDropResult());
        console.info('monitor.getItemType() :', monitor?.getItemType());
        console.error(' WHITE _CONTAINER :',  "TOP  _CONTAINER");
    },
  }),[]);

    return <span ref={drop} className='whitecontainer h-full w-full' >
        {[1].map(i=><MyBox idx={i}/>)}
    </span>;
}

export const Container = () => {

    return (
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2" >
            <MySideBar />
            <MyMidArea />
        </div>
    )
}
