import './ButtonChoice.css';

const ButtonChoice = ({design = 1, active = false, src, alt1 = "", src2, alt2 = "", ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "ButtonChoice-D" + design;
    if(active === true) klasy += " ButtonChoice-Active";

    return (
        <div {...rest} className={klasy}>
            {design === 1 && (
                <>
                    <img src={src} alt={alt1}/>
                    {src2 && <img src={src2} alt={alt2}/>}
                </>
            )}
            {design === 2 && (
                <>
                    <div className={"D2"}></div>
                </>
            )}
        </div>
    );
}

export default ButtonChoice;