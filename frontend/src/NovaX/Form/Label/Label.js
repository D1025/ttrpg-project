import './Label.css'

// Label.
const Label = ({
                   children,
                   htmlFor,
                   marginBottom = true,
                   marginLeftRight = true,
                   marginTop = false,
                   className,
                   ...rest
               }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Label'];

        if(marginLeftRight === true) classList.push('MarginLeftRight');
        if(marginBottom === true) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
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