import './XPMaly.css';

const XPMaly = ({onClick, styl=1, aktywny=false, obraz}) =>
{
    let klasy = "XPMaly";
    if(styl > 0) klasy += " XPMaly-S" + 1;
    if(aktywny === true) klasy += " XPMaly-Aktywny";

    return(
        <div className={klasy} onClick={onClick}>
            <img src={obraz} alt=""/>
        </div>
    );
};

export default XPMaly;