import './XMMenu.css';

const XMMenu = ({children}) => {
    return (
        <nav className={"XNav"}>
            {children}
        </nav>
    );
}

export default XMMenu;