import './Hr.css';

// Hr.
const Hr = ({design = 1, marginBottom = false, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        // Dodawanie dodatkowej klasy przekazanej jako props.
        if(design > 0) classList.push(`Hr-D${design}`)
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