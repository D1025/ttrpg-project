import './ButtonChoice.css';

// Button Choice.
const ButtonChoice = ({design = 1, active = false, className, src, alt1 = "", src2, alt2 = "", ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        // Tworzenie listy klas.
        if(design > 0) classList.push(`ButtonChoice-D${design}`);
        if(className) classList.push(className);
        if(active) classList.push('ButtonChoice-Active');

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {design === 1 && (
                <>
                    <img src={src} alt={alt1}/>
                    {src2 && <img src={src2} alt={alt2}/>}
                </>
            )}
            {design === 2 && (
                <>
                    <div/>
                </>
            )}
        </div>
    );
}

export default ButtonChoice;