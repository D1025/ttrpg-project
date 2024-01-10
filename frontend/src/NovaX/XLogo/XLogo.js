import './XLogo.css';
import React from "react";

const XLogo = ({src, alt = "", href, ...rest}) =>
{
    return (
        <a {...rest} href={href} className="XLogo">
            <img src={src} alt={alt}/>
        </a>
    );
}

export default XLogo;