import './Button.css';

const Button = ({title, width = 1, marginBottom = false, active = false, src, alt = "", ...rest}) =>
{
    let klasy = "Button-D1";
    if(title) klasy = "Button-D2";
    if(width >= 0) klasy += " Button-W" + width;
    if(marginBottom === true) klasy += " Button-BMargin";
    if(active === true) klasy += " Button-Active";

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

export default Button;