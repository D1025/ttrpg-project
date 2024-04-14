import './ButtonLogo.css';
import React from "react";

// Button Logo.
const ButtonLogo = ({
                        src,
                        alt = "",
                        title,
                        href,
                        marginLeftRight = true,
                        marginBottom = false,
                        marginTop = false,
                        colorNumber,
                        className,
                        ...rest
                    }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        classList.push(title ? 'ButtonLogo-D2' : 'ButtonLogo-D1');
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(colorNumber > 0) classList.push(`BackgroundColor-${colorNumber}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Return.
    return (
        <a
            {...rest}
            href={href}
            className={classBuilder()}
            tabIndex={0}
        >
            {src && <div>
                <img src={src} alt={alt}/>
            </div>}
            {title && <div>
                {title}
            </div>}
        </a>
    );
}

export default ButtonLogo;