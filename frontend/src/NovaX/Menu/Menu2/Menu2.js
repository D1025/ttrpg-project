import './Menu2.css';

// Menu 2.
const Menu2 = ({children, tag = "ol", className, ...rest}) =>
{
    //  Customowy Tag.
    const Tag = tag;

    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        // Dodaje dodatkową klasę przekazaną jako props.
        let classList = ['Menu2'];
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'
    const myClass = classBuilder();

    // Return.
    return (
        <Tag {...rest} className={myClass}>
            {children}
        </Tag>
    );
}

export default Menu2;