// Episode Bar Middle.
const InfoBarMiddle = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['InfoBar-Middle'];

        // Dodawanie dodatkowych klas na podstawie warunków.
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'.
    const myClass = classBuilder();

    // Return.
    return (
        <div {...rest} className={myClass}>
            {children}
        </div>
    );
}

export default InfoBarMiddle;