import './Button.css';

// Button.
const Button = ({
                    title,
                    width = 1,
                    href,
                    className,
                    marginBottom = false,
                    marginLeftRight = true,
                    colorNumber = 0,
                    active = true,
                    wrapWord = false,
                    src,
                    alt = "",
                    ...rest
                }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        // Tworzenie listy klas.
        classList.push(title ? 'Button-D2' : 'Button-D1');
        if(width >= 0 && title) classList.push(`Width-${width}`);
        if(marginBottom) classList.push('Button-MarginBottom');
        if(marginLeftRight) classList.push('Button-MarginLeftRight');
        if(active === false) classList.push('Button-noActive');
        if(colorNumber > 0  && active !== false) classList.push(`BackgroundColor-${colorNumber}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <>
            {href ? (
                <div {...rest} className={myClass}>
                    <a href={href}>
                        {src && (
                            <img src={src} alt={alt}/>
                        )}
                        {title && (
                            <div>{title}</div>
                        )}
                    </a>
                </div>
            ) : (
                <div {...rest} className={myClass}>
                    {src && (
                        <img src={src} alt={alt}/>
                    )}
                    {title && (
                        <div className={wrapWord ? 'Button-Wrap' : undefined}>{title}</div>
                    )}
                </div>
            )}
        </>
    );
};

export default Button;