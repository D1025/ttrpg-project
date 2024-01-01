import './XPSzeroki.css';

const XPSzeroki = ({nazwa, styl=1, aktywny=false, pion=false, onClick}) => {
    let klasy = "XPSzeroki";
    if(styl > 0) klasy += " XPSzeroki-S" + styl;
    if(aktywny === true) klasy += " XPSzeroki-Aktywny";
    if(pion === true)
    {
        klasy += " XPSzeroki-Pion";
    }
    else
    {
        klasy += " XPSzeroki-Poziom";
    }

    return (
        <div className={klasy} onClick={onClick}>
            {nazwa}
        </div>
    );
}

export default XPSzeroki;