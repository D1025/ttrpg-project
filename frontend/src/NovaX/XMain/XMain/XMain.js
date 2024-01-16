import React from 'react';
import './XMain.css';
import {XMainArticle, XMainPanel} from "../../index";

const XMain = ({children, design = 1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "XMain-D" + design;

    // Dzieli children komponentu na fragmenty listy.
    const Main = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === XMainArticle);

    const Panel = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === XMainPanel);

    return (
        <main {...rest} className={klasy}>
            {design === 1 ? (
                <>
                    <div>
                        {Main.map((element) => (
                            element
                        ))}
                    </div>
                    <>
                        {Panel[0]}
                    </>
                </>
            ) : null}

            {design === 2 || design === 3 ? (
                <>
                    <>
                        {Panel[0]}
                    </>
                    <div>
                        {Main.map((element) => (
                            element
                        ))}
                    </div>
                </>
            ) : null}
        </main>
    )
}

export default XMain;