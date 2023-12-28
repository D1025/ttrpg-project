import './XPMaly.css';

const XPMaly = ({onClick, obraz}) =>
{
    return(
        <div className={"XPMaly"} onClick={onClick}>
            <img src={obraz} alt=""/>
        </div>
    );
};

export default XPMaly;