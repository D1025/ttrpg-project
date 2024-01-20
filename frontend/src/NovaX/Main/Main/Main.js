import React from 'react';
import './Main.css';
import {MainArticle, MainPanel} from "../../index";

const Main = ({children, design = 1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "Main-D" + design;

    // Dzieli children komponentu na fragmenty listy.
    const Main = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === MainArticle);

    const Panel = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === MainPanel);

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

export default Main;