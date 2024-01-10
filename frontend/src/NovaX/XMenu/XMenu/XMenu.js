import React from "react";
import './XMenu.css';

// Prywatny komponent zapewniający spójność menu.
const XLi_Pomocnicze = ({children, ...rest}) =>
{
    // Czy children zawiera tag/i.
    const czyMaTag = React.Children.toArray(children).some(
        child => React.isValidElement(child)
    );

    // Zabespieczenie migania Li.
    const classNames = czyMaTag ? 'XMenu-Nieklikalny' : null;

    return (
        <li {...rest} className={classNames}>
            {children}
        </li>
    );
};

// Główny komponent prostego menu.
const XMenu = ({children, tag = "ol", ...rest}) =>
{
    const TagName = tag;

    return (
        <TagName {...rest} className="XMenu">
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

export default XMenu;