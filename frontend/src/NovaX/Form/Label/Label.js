import './Label.css'

// Label.
const Label = ({children, htmlFor, marginBottom = true, marginLeftRight = true, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Label'];

        // Dodawanie klasy na podstawie wartości.
        if(marginBottom === true) classList.push('Label-MarginBottom');
        if(marginLeftRight === true) classList.push('Label-MarginLeftRight');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <label
            {...rest}
            htmlFor={htmlFor}
            className={myClass}>
            {children}
        </label>
    )
}

export default Label;