import React from 'react';
import './Code2Text.css';

// Code To Text.
const Code2Text = ({children, ...rest}) =>
{
    // Return.
    return (
        <pre {...rest}>
            <code>
                {children}
            </code>
        </pre>
    );
};

export default Code2Text;