import './XMMenu.css';

const XMMenu = ({children, tag = "ol", ...rest}) =>
{
    const TagName = tag;

    return (
        <TagName {...rest} className={"XMenu"}>
            {children}
        </TagName>
    );
}

export default XMMenu;