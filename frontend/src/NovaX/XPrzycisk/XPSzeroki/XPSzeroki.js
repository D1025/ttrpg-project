import './XPSzeroki.css';

const XPSzeroki = ({nazwa, styl = 1, onClick}) => {
    let klasy = "XPSzeroki XPSzeroki";
    if(!styl || styl < 0) styl = 1
    klasy += styl;

    return (
        <div className={klasy} onClick={onClick}>
            {nazwa}
        </div>
    );
}

export default XPSzeroki;