import './Textarea.css';

// Textarea.
const Textarea = ({className, placeholder = "Textarea", ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Textarea'];

        // Dodawanie klasy na podstawie wartości.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <textarea
            {...rest}
            placeholder={placeholder}
            className={myClass}
        />
    );
}

export default Textarea;