import './XPWybor.css';

const XPWybor = ({onClick, obraz, aktywny}) =>
{
    let klasy = "XPWybor";
    if(aktywny === true)
    {
        klasy += " XPWybor-Aktywny";
    }

    return (
        <div className={klasy} onClick={onClick}>
            <img src={obraz} alt={""}/>
        </div>
    );
};

export default XPWybor;

// Struktura.
// <XPWybor  onClick={() => funkcja} aktywny={true/false} >