import './XButtonLogo.css';
import React from "react";

const XButtonLogo = ({src, alt = "", title, fontSize, href, ...rest}) =>
{
    return (
        <a {...rest} href={href} className="XButtonLogo">
            {src && <img src={src} alt={alt}/>}
            {title && <div style={{fontSize: fontSize}}>{title}</div>}
        </a>
    );
}

export default XButtonLogo;