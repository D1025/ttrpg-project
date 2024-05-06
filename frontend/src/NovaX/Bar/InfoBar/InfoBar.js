import './InfoBar.css';

// Episod Bar.
const InfoBar = ({children, title, design = 1, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = ['InfoBar'];

        // Dodawanie dodatkowych klas na podstawie warunków.
        if(design === 2) classList.push('InfoBar-Active');
        if(design === 3) classList.push('InfoBar-Inactive');
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

export default InfoBar;