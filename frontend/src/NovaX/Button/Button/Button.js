import './Button.css';

// Button.
const Button = ({
                    title,
                    width = 1,
                    href,
                    src,
                    alt = "",
                    marginTop = false,
                    marginBottom = false,
                    marginLeftRight = true,
                    colorNumber = 0,
                    active = true,
                    wrapWord = false,
                    onClick,
                    className,
                    disabled = false,
                    ...rest
                }) =>
{
    // Obsługa spacji.
    const handleKeyDown = (event) =>
    {
        if(event.keyCode === 32 || event.keyCode === 13)
        {
            event.preventDefault();
            if(onClick) onClick(event);
        }
    };

    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Button'];

        classList.push(title ? 'Button-D2' : 'Button-D1');
        if(width >= 0 && title) classList.push(`Width-${width}`);
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(active === false) classList.push('Button-noActive');
        if(wrapWord === true) classList.push('Button-Wrap');
        if(colorNumber > 0 && active !== false) classList.push(`BackgroundColor-${colorNumber}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <>
            {href ? (
                <div
                    {...rest}
                    onKeyDown={handleKeyDown}
                    onClick={onClick}
                    className={myClass}
                    tabIndex={0}
                >
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
                <div
                    {...rest}
                    onKeyDown={handleKeyDown}
                    onClick={onClick}
                    className={myClass}
                    tabIndex={0}
                >
                    {src && (
                        <img src={src} alt={alt}/>
                    )}
                    {title && (
                        <div>{title}</div>
                    )}
                </div>
            )}
        </>
    );
};

export default Button;