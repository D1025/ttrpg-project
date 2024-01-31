import React from 'react';
import './ChatBox.css';

const ChatBox = ({children, ...rest}) =>
{
    return (
        <div {...rest} className="ChatBox">
            {children}
        </div>
    );
}

export default ChatBox;
