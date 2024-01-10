import './XButton.css';

const XButton = ({title, width = 1, marginBottom = false, active = false, src, alt = "", ...rest}) =>
{
    let klasy = "XButton-D1";
    if(title) klasy = "XButton-D2";
    if(width > 0) klasy += " XButton-W" + width;
    if(marginBottom === true) klasy += " XButton-Margin";
    if(active === true) klasy += " XButton-Active";

    return (
        <div {...rest} className={klasy}>
            {src && (
                <img src={src} alt={alt}/>
            )}
            {title && (
                <div>{title}</div>
            )}
        </div>
    );
};

export default XButton;