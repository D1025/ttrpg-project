import React from 'react';
import './ArticleTitle.css';
import {Hr, ArticleTitleOption, ArticleTitleTag} from "../../../index";

// Main MainArticleTitle Title.
const ArticleTitle = ({title, design = 1, className, tag = "div", children, ...rest}) =>
{
    // Możliwość zmiany tagu.
    const Tag = tag;

    // Decyduje o wyglądzie.
    const classBuilder = () =>
    {
        // Dodaje dodatkową klasę przekazaną jako props.
        let classList = [`ArticleTitle`];

        if(className) classList.push(className);

        return classList.join(' ');
    };

    // Przypisanie listy klas w postaci 'String'
    const myClass = classBuilder();

    // Pobieranie Tagów.
    const tags = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === ArticleTitleTag)
        .map(tagChild => tagChild);

    // Pobieranie Opcji.
    const options = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.type === ArticleTitleOption)
        .map(optionChild => optionChild.props.children);


    // Return.
    return (
        <Tag {...rest} className={myClass}>
            <div>
                {title && (<div className="ArticleTitle-Title">{title}</div>)}
                {options && (<div className={"ArticleTitle-Option"}>{options}</div>)}
            </div>
            {tags && (<div className={"ArticleTitle-Tags"}>{tags}</div>)}
            <Hr design={design} marginBottom={true}/>
        </Tag>
    );
}

export default ArticleTitle;