import './XHeader.css';

const XHeader = ({children, styl, ...rest}) =>
{
    let klasy = "XHeader XHeader";
    if(!styl || styl > 3 || styl < 0) styl = 1
    klasy += styl;

    return (
        <div {...rest} className={klasy}>
            {children}
        </div>
    );
};

export default XHeader;