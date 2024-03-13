import './Input.css';

// Input.
const Input = ({
                   type,
                   autoFocus,
                   value,
                   placeholder,
                   disabled,
                   active = false,
                   width = 2,
                   marginBottom = false,
                   marginLeftRight = true,
                   className,
                   ...rest
               }) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['Input'];

        // Dodawanie klasy na podstawie wartości.
        if(active === true) classList.push('Input-Active');
        if(width > 0) classList.push(`Width-${width}`);
        if(marginLeftRight === true) classList.push('Input-MarginLeftRight');
        if(marginBottom === true) classList.push('Input-MarginBottom');
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <input
            {...rest}
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            type={type}
            className={myClass}
        />
    );
}

export default Input;
