import './Header.css';

const Header = ({children, design = 1, src = "", ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy += "Header-D" + design;

    const style = src && design === 1 ? {backgroundImage: `linear-gradient(to right, var(--Motyw), transparent 190%), url(${src})`} : {};

    return (
        <div {...rest} className={klasy} style={{backgroundStyle: style, ...rest.style}}>
            {children}
        </div>
    );
};

export default Header;
