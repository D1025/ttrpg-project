import './XMMenu.css';

const XMMenu = ({children, tag = "nav"}) => {
    const TagName = tag;

    return (
        <TagName className={"XMenu"}>
            {children}
        </TagName>
    );
}

export default XMMenu;