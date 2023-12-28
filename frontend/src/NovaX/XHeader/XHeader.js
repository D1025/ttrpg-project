import './XHeader.css';

const XHeader = ({children, styl}) =>
{
    let klasy = "XHeader";

    if(styl === 2)
    {
        klasy += " XHeader2";
    }
    else if(styl === 3)
    {
        klasy += " XHeader3";
    }
    else if(styl === 4)
    {
        klasy += " XHeader4";
    }
    else
    {
        klasy += " XHeader1";
    }

    return (
        <div className={klasy}>
            {children}
        </div>
    );
};

export default XHeader;