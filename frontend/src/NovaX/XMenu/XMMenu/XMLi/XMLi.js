import React from 'react';
import './XMLi.css';

const XMLi = ({ children, ...rest }) => {
    // Czy children zawiera tag/i.
    const czyMaTag = React.Children.toArray(children).some(
        child => React.isValidElement(child)
    );

    // Zabespiecza miganie elementów.
    const classNames = czyMaTag ? 'XMLi-Nieklikalny' : '';

    return (
        <li {...rest} className={classNames}>
            {children}
        </li>
    );
};

export default XMLi;
