import './XPWybor.css';

const XPWybor = ({onClick, obraz, obraz2, styl}) =>
{
    let klasy = "XPWybor XPWybor";
    if(!styl || styl < 0) styl = 1
    klasy += styl;

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