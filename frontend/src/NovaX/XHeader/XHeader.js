import './XHeader.css';

const XHeader = ({children, design, ...rest}) =>
{
    let klasy = "XHeader XHeader";
    if(!design || design > 3 || design < 0) design = 1
    klasy += design;

    return (
        <div {...rest} className={klasy}>
            {children}
        </div>
    );
};

export default XHeader;