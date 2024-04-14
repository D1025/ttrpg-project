import React from "react";
import './Menu.css';

// Prywatny komponent zapewniający spójność menu.
const Li_Pomocnicze = ({children}) =>
{
    // Czy children zawiera tag/i.
    const czyMaTag = React.Children.toArray(children).some(
        child => React.isValidElement(child)
    );

    // Dodaje klasę, kiedy li posiada w sobie jeszcze dodatkowy tag.
    const classNames = czyMaTag ? 'Menu-Disabled' : null;

    // Return.
    return (
        <li className={classNames} tabIndex={0}>
            {children}
        </li>
    );
};


// Menu.
const Menu = ({children, tag = "ul", width=1, className, ...rest}) =>
{
    // Customowy tag.
    const TagName = tag;

    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        // Dodaje dodatkową klasę przekazaną jako props.
        let classList = ['Menu'];

        if(width>=0) classList.push(`Width-${width}`)
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'
    const myClass = classBuilder();

    // Return.
    return (
        <TagName {...rest} className={myClass}>
            {React.Children.map(children, child =>
            {
                if(React.isValidElement(child) && child.type === 'li')
                {
                    // Zamień li na Li_Pomocnicze
                    return <Li_Pomocnicze {...child.props}>{child.props.children}</Li_Pomocnicze>;
                }
                return child;
            })}
        </TagName>
    );
};

export default Menu;