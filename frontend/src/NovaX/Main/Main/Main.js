import React from 'react';
import './Main.css';
import {MainArticle, MainPanel} from "../../index";

// Main.
const Main = ({children, design = 1, className, ...rest}) =>
{
    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        let classList = [];

        // Dodaje dodatkową klasę przekazaną jako props.
        if(design > 0) classList.push(`Main-D${design}`);
        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'
    const myClass = classBuilder();

    // Lysta Artykółów.
    const Article = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === MainArticle);

    // Lista Paneli.
    const Panel = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === MainPanel);

    // Return.
    return (
        <main {...rest} className={myClass}>
            {design === 1 ? (
                <>
                    <div className={"ArticleArea"}>
                        {Article.map((AllArticle) => (
                            AllArticle
                        ))}
                    </div>
                    <div className={"PanelArea"}>
                        {Panel.map((AllPanels) => (
                            AllPanels
                        ))}
                    </div>
                </>
            ) : null}

            {design === 2 || design === 3 ? (
                <>
                    <div className={"PanelArea"}>
                        {Panel.map((AllPanels) => (
                            AllPanels
                        ))}
                    </div>
                    <div className={"ArticleArea"}>
                        {Article.map((AllArticle) => (
                            AllArticle
                        ))}
                    </div>
                </>
            ) : null}
        </main>
    )
}

export default Main;