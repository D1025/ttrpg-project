import './Select.css';

// Select.
const Select = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Select'];

        // Dodawanie klasy na podstawie wartości.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <select {...rest} className={myClass}>
            {children}
        </select>
    );
}

export default Select;