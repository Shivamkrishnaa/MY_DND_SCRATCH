import React from 'react';
import "./Bubble.css";

const ThoughtBubble = ({ children }) => {
    return (
        <p class="bubble thought">
            {children}
        </p>
    );
};

export default ThoughtBubble;
