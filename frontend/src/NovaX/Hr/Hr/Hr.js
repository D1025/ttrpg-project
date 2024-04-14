import './Hr.css';

// Hr.
const Hr = ({colorNumber = 0, marginBottom = false, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Hr'];

        if(colorNumber > 0) classList.push(`BackgroundColor-${colorNumber}`)
        if(marginBottom) classList.push('Hr-MarginBottom');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <hr {...rest} className={myClass}/>
    );
}

export default Hr;