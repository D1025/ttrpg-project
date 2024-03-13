import './Header.css';

// Header.
const Header = ({children, src = "", design = 1, className, style, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        // Dodawanie klasy na podstawie wartości.
        if(design > 0) classList.push(`Header-D${design}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {children}
        </div>
    );
};

export default Header;