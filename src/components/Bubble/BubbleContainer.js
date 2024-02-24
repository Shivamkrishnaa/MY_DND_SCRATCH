import React from 'react'
import './Bubble.css'
import { useSelector } from 'react-redux';
export const BubbleContainer = ({ id }) => {
  const {
    left,
    top,
    height,
    width,
    transition,
    display,
    text,
    type,
  } = useSelector((state) => {
    return {
      left: state.preview.present.sprite[id].left,
      top: state.preview.present.sprite[id].top,
      rotate: state.preview.present.sprite[id].rotate,
      transition: state.preview.present.sprite[id].transition,
      display: state.preview.present.sprite[id].display,
      height: state.preview.present.sprite[id].height,
      width: state.preview.present.sprite[id].width,
      text: state.preview.present.sprite[id].bubble.text,
      type: state.preview.present.sprite[id].bubble.type,
    };
  });
  if (!text || display === "none") return <></>;
  return <div className="relative"
    style={{
      top: `calc(43% - 14rem + ${top}px - ${height / 2}px)`,
      left: `calc(100% - 14.5rem + ${left}px + ${width / 2}px)`,
      display: "inline-block",
      transition,
    }}>
    <p className={`bubble left` + type}>{text}</p>
  </div>;
}
export default BubbleContainer;