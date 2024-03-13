import './ButtonAccount.css';

// Button Acount.
const ButtonAccount = ({
                           avatarLocation = "right",
                           title,
                           userTitle,
                           src,
                           alt = "",
                           className,
                           marginLeftRight = true,
                           width = 1,
                           ...rest
                       }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['ButtonAccount'];

        // Tworzenie listy klas.
        (width >= 0) ? classList.push(`Width-${width}`) : (classList.push(`ButtonAccount-W1`))
        if(marginLeftRight) classList.push('ButtonAccount-MarginLeftRight');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {/* Nick po lewej. */}
            {avatarLocation === "left" && (
                <div className={"ButtonAccount-Img"}>
                    {src && (<img src={src} alt={alt}/>)}
                </div>
            )}

            {/* Nazwa i podtytół. */}
            <div className={"ButtonAccount-Title"}>
                <div>{title}</div>
                {userTitle && (<div>{userTitle}</div>)}
            </div>

            {/* Nick po prawej [Domyślny]. */}
            {avatarLocation === "none" ? (
                <></>
            ) : (
                <div className={"ButtonAccount-Img"}>
                    {src && (<img src={src} alt={alt}/>)}
                </div>
            )}
        </div>
    )
        ;
}

export default ButtonAccount;