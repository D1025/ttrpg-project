// Episode Bar Tiny.
const InfoBarTiny = ({children, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['InfoBar-Tiny'];

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

export default InfoBarTiny;