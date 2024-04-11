import './ButtonLogo.css';
import React from "react";

// Button Logo.
const ButtonLogo = ({src, alt = "", title, colorNumber, className, href, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        classList.push(title ? 'ButtonLogo-D2' : 'ButtonLogo-D1');
        classList.push(colorNumber >= 0 && `BackgroundColor-${colorNumber}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <a {...rest} href={href} className={myClass}>
            {
                src && <img src={src} alt={alt}/>
            }
            {
                title && <div>{title}</div>
            }
        </a>
    );
}

export default ButtonLogo;