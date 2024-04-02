import './AccountBox.css'

// Account.png Box.
const AccountBox = ({
                        title,
                        tittleLength = 8,
                        subTitle,
                        active = null,
                        src,
                        alt = "",
                        className,
                        ...rest
                    }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['AccountBox'];

        // Tworzenie listy klas.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Skraca tittle do 10 znaków.
    const shortenTitle = (title) =>
    {
        if(title.length > tittleLength)
        {
            return title.slice(0, tittleLength) + '...';
        }
        return title;
    };

    // Return.
    return (
        <div {...rest} className={myClass}>
            <div className={"AccountBox-Avatar"}>
                <img src={src} alt={alt}/>
            </div>

            {active !== null &&
                (<div className={"AccountBox-Status"}>
                    <div className={active === true ? "Active" : undefined}/>
                </div>)}

            <div className={"AccountBox-Tittle"}>
                <div>{shortenTitle(title)}</div>
                <div>{subTitle}</div>
            </div>
        </div>
    );
}

export default AccountBox;