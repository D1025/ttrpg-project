import React from 'react';
import './XMainTitle.css';

const XMainTitle = ({title, tag = "div", children, ...rest}) =>
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
        <Tag {...rest} className={"XMainTitle"}>
            <div>
                {title && (<div className="XMainTitle-Title">{title}</div>)}
                {options && (<div className={"XMainTitle-Option"}>{options}</div>)}
            </div>
            {tags && (<div className={"XMainTitle-Tags"}>{tags}</div>)}
            <hr/>
        </Tag>
    );
}

export default XMainTitle;