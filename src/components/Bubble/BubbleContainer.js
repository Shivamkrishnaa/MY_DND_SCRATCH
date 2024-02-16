import React, { useEffect, useState } from 'react'
import './Bubble.css'
import { useSelector } from 'react-redux';
export const BubbleContainer = () => {
  const {
    left,
    top,
    transition,
    display,
    text,
    type,
  } = useSelector((state) => {
    return {
      left: state.sprite.present.sprite.left,
      top: state.sprite.present.sprite.top,
      rotate: state.sprite.present.sprite.rotate,
      transition: state.sprite.present.sprite.transition,
      display: state.sprite.present.sprite.display,
      text: state.sprite.present.sprite.bubble.text,
      type: state.sprite.present.sprite.bubble.type,
    };
  });
  if (!text) return <></>;
  
  return <div className="bubble__container"
    style={{
      position: "absolute",
      top: `calc(50% - 15rem + ${top}px)`,
      left: `calc(50% - 14.5rem + ${left}px + ${width}px)`,
      display,
      transition,
    }}>
    <p className='bubble thought'>{text}</p>
  </div>;
}
