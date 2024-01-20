import React from 'react';
import './XMain.css';

const XMain = ({children, design = 1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "XMain-D" + design;

    // Dzieli children komponentu na fragmenty listy.
    const Blok = React.Children.toArray(children)
        .filter(child => React.isValidElement(child))
        .map(tagChild => tagChild);

    return (
        <main {...rest} className={klasy}>
            {design === 1 ? (
                <>
                    {Blok[0]}
                    {Blok[1]}
                </>
            ) : null}
            {design === 2 || design === 3 ? (
                <>
                    {Blok[1]}
                    {Blok[0]}
                </>
            ) : null}
        </main>
    )
}

export default XMain;