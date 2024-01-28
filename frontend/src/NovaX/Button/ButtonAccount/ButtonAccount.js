import './ButtonAccount.css';

const ButtonAccount = ({design = 1, title, userTitle, src, alt = "", width=1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "ButtonAccount-D" + design;
    if(width>-1) klasy += " ButtonAccount-W" + width;

    return (
        <div {...rest} className={klasy}>
            {design === 1 && (
                <>
                    <div className={"ButtonAccount-Title"}>
                        <div>{title}</div>
                        {userTitle && (<div>{userTitle}</div>)}
                    </div>

                    <div className={"ButtonAccount-Img"}>
                        {src && (<img src={src} alt={alt}/>)}
                    </div>
                </>
            )}

            {design === 2 && (
                <>
                    <div className={"ButtonAccount-Img"}>
                        {src && (<img src={src} alt={alt}/>)}
                    </div>

                    <div className={"ButtonAccount-Title"}>
                        <div>{title}</div>
                        {userTitle && (<div>{userTitle}</div>)}
                    </div>
                </>
            )}
        </div>
    )
        ;
}

export default ButtonAccount;