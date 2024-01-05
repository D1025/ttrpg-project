import './XPWybor.css';

const XPWybor = ({design=1, active=false, src, src2, ...rest}) => {
    let klasy = "XPWybor";
    if (design > 1) klasy = "XPWybor" + design;
    if (active === true) klasy += " XPWybor-Aktywny";

    return (
        <div {...rest} className={klasy}>
            {design === 1 && (
                <>
                    <img src={src} alt={""}/>
                    {src2 && <img src={src2} alt={""}/>}
                </>
            )}
            {design===2 && (
                <>
                    <div></div>
                </>
            )}
        </div>
    );
}

export default XPWybor;