import React from "react";
import './Menu.css';

// Prywatny komponent zapewniający spójność prostego menu.
const XLi_Pomocnicze = ({children}) =>
{
    // Czy children zawiera tag/i.
    const czyMaTag = React.Children.toArray(children).some(
        child => React.isValidElement(child)
    );

    // Dodaje klasę, kiedy li posiada w sobie jeszcze dodatkowy tag.
    const classNames = czyMaTag ? 'Menu-Disabled' : null;

    return (
        <li className={classNames}>
            {children}
        </li>
    );
};

// Główny komponent prostego menu.
const Menu = ({children, tag = "ol", ...rest}) =>
{
    const TagName = tag;

    return (
        <TagName {...rest} className="Menu">
            {React.Children.map(children, child =>
            {
                if(React.isValidElement(child) && child.type === 'li')
                {
                    // Zamień li na XLi_Pomocnicze
                    return <XLi_Pomocnicze {...child.props}>{child.props.children}</XLi_Pomocnicze>;
                }
                return child;
            })}
        </TagName>
    );
};

export default Menu;