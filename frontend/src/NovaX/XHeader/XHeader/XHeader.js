import './XHeader.css';

const XHeader = ({children, design=1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy += "XHeader-D" + design;

    return (
        <div {...rest} className={klasy}>
            {children}
        </div>
    );
};

export default XHeader;