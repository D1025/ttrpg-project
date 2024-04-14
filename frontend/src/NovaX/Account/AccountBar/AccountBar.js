import './AccountBar.css';

// Button Acount.
const AccountBar = ({
                        design = 1,
                        title,
                        subTitle,
                        src,
                        alt = "",
                        maxLength = 20,
                        className,
                        marginLeftRight = true,
                        marginBottom = false,
                        marginTop = false,
                        width = 1,
                        ...rest
                    }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountBar'];

        if(design > 0) classList.push(`AccountBar-D${design}`)
        if(width >= 0) classList.push(`Width-${width}`)
        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom === true) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {/* Avatar po lewej. */}
            {design === 2 && (
                <div className={"AccountBar-Img"}>
                    {src && (<img src={src} alt={alt}/>)}
                </div>
            )}

            {/* Nazwa i podtytół. */}
            <div className={"AccountBar-Title"}>
                <div>{title.length > maxLength ? title.substring(0, maxLength) + '...' : title}</div>
                {subTitle && (<div>{subTitle}</div>)}
            </div>

            {/* Avatar po prawej. */}
            {design === 1 && (
                <div className={"AccountBar-Img"}>
                    {src && (<img src={src} alt={alt}/>)}
                </div>
            )}
        </div>
    )
}

export default AccountBar;