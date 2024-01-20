import './Header.css';

const Header = ({children, design = 1, src = "", ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy += "Header-D" + design;

    return (
        <div {...rest} className={klasy}
             style={{backgroundImage: `linear-gradient(to right, var(--Motyw), transparent 190%), ${src}`, ...rest.style}}>
            {children}
        </div>
    );
};

export default Header;