import './XButtonLogo.css';
import React from "react";

const XButtonLogo = ({src, alt = "", title, fontSize, href, ...rest}) =>
{
    let klasa = "XButtonLogo-D1";
    if(title) klasa="XButtonLogo-D2"

    return (
        <a {...rest} href={href} className={klasa}>
            {src && <img src={src} alt={alt}/>}
            {title && <div style={{fontSize: fontSize}}>{title}</div>}
        </a>
    );
}

export default XButtonLogo;