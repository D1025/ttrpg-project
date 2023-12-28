import './XPMaly.css';

const XPMaly = ({onClick, styl, obraz}) =>
{
    let klasy = "XPMaly XPMaly";
    if(!styl || styl < 0) styl = 1
    klasy += styl;

    return(
        <div className={klasy} onClick={onClick}>
            <img src={obraz} alt=""/>
        </div>
    );
};

export default XPMaly;