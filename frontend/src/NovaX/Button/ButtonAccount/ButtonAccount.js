import './ButtonAccount.css';

const ButtonAccount = ({design = 1, title, src, alt = "", ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "ButtonAccount-D" + design;

    return (
        <div className={klasy}>
            {design === 1 && (
                <>
                    <div className={"ButtonAccount-Title"}>
                        {title}
                    </div>

                    <div className={"ButtonAccount-Img"}>
                        <img src={src} alt={alt}/>
                    </div>
                </>
            )}

            {design === 2 && (
                <>
                    <div className={"ButtonAccount-Img"}>
                        <img src={src} alt={alt}/>
                    </div>

                    <div className={"ButtonAccount-Title"}>
                        {title}
                    </div>
                </>
            )}
        </div>
    )
        ;
}

export default ButtonAccount;