import './Header.css';

const Header = ({children, design=1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy += "Header-D" + design;

    return (
        <div {...rest} className={klasy}>
            {children}
        </div>
    );
};

export default Header;