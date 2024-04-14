import './Textarea.css';

// Textarea.
const Textarea = ({
                      className,
                      placeholder = "Textarea",
                      marginLeftRight = false,
                      marginBottom = false,
                      marginTop = false,
                      ...rest
                  }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Textarea'];

        if(marginLeftRight) classList.push('MarginLeftRight');
        if(marginBottom) classList.push('MarginBottom');
        if(marginTop) classList.push('MarginTop');
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