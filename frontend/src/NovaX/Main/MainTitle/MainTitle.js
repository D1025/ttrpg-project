import React from 'react';
import './MainTitle.css';

const MainTitle = ({title, tag = "div", children, ...rest}) =>
{
    const Tag = tag;

    // Pobiera dane od Div o odpowiednich typach.
    const tags = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.props.type === 'tag')
        .map(tagChild => tagChild.props.children);

    const options = React.Children.toArray(children)
        .filter(child => React.isValidElement(child) && child.props.type === 'option')
        .map(optionChild => optionChild.props.children);


    return (
        <Tag {...rest} className={"MainTitle"}>
            <div>
                {title && (<div className="MainTitle-Title">{title}</div>)}
                {options && (<div className={"MainTitle-Option"}>{options}</div>)}
            </div>
            {tags && (<div className={"MainTitle-Tags"}>{tags}</div>)}
            <hr/>
        </Tag>
    );
}

export default MainTitle;