import './XPWybor.css';

const XPWybor = ({onClick, obraz, obraz2, aktywny}) =>
{
    let klasy = "XPWybor";
    if(aktywny === true)
    {
        klasy += " XPWybor-Aktywny";
    }

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