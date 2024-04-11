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
                           width = 1,
                           ...rest
                       }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountBar'];

        // Tworzenie listy klas.
        if(width >= 0) classList.push(`Width-${width}`)
        if(marginLeftRight) classList.push('AccountBar-MarginLeftRight');
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