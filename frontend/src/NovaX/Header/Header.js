import './Header.css';

// Header.
const Header = ({children, src = false, design = 1, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Header'];

        if(design > 0) classList.push(`Header-D${design}`);
        if(src === true && design === 1) classList.push(`Header-Img`);
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