import './XMMenu.css';

const XMMenu = ({children, tag = "nav", ...rest}) => {
    const TagName = tag;

    return (
        <TagName {...rest} className={"XMenu"}>
            {children}
        </TagName>
    );
}

export default XMMenu;