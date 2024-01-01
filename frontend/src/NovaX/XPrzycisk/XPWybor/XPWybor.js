import './XPWybor.css';

const XPWybor = ({styl=1, aktywny=false, obraz, obraz2, onClick}) =>
{
    let klasy = "XPWybor";
    if(styl > 0) klasy += " XPWybor-S" + styl;
    if(aktywny === true) klasy += " XPWybor-Aktywny";

    return (
        <div className={klasy} onClick={onClick}>
            <img src={obraz} alt={""}/>
            {
                obraz2 && (<img src={obraz2} alt={""}/>)
            }
        </div>
    );
};

export default XPWybor;