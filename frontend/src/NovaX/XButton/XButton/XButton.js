import './XButton.css';

const XButton = ({tittle, width, marginBottom = false, active = false, src, alt = "", ...rest}) =>
{
    let klasy = "XButton-D1";
    if(tittle) klasy = "XButton-D2";
    if(width) klasy += " XButton-W" + width;
    if(marginBottom === true) klasy += " XButton-Margin";
    if(active === true) klasy += " XButton-Active";

    return (
        <div {...rest} className={klasy}>
            {src && (
                <img src={src} alt={alt}/>
            )}
            {tittle && (
                <div>{tittle}</div>
            )}
        </div>
    );
};

export default XButton;