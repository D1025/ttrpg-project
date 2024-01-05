import './XPPrzycisk.css';

const XPPrzycisk = ({tittle, width, marginBottom, active=false, src, ...rest}) =>
{
    let klasy = "XPPrzycisk";
    if(tittle) klasy = "XPPrzycisk2";
    if(width) klasy += " XPPrzycisk-W" + width;
    if(active === true) klasy += " XPPrzycisk-Aktywny";

    return(
        <div {...rest} className={klasy}>
            {src && (
                <img src={src} alt=""/>
            )}
            {tittle && (
                <div>{tittle}</div>
            )}
        </div>
    );
};

export default XPPrzycisk;