import './ButtonLogo.css';
import React from "react";

const ButtonLogo = ({src, alt = "", title, fontSize, href, ...rest}) =>
{
    let klasa = "ButtonLogo-D1";
    if(title) klasa="ButtonLogo-D2"

    return (
        <a {...rest} href={href} className={klasa}>
            {src && <img src={src} alt={alt}/>}
            {title && <div style={{fontSize: fontSize}}>{title}</div>}
        </a>
    );
}

export default ButtonLogo;